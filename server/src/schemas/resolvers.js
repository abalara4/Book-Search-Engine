import User from '../models/User.js'; // Adjust the import based on your file structure
import { signToken } from '../services/auth.js'; // Import the signToken function
const resolvers = {
    Query: {
        // Get the current user
        me: async (_parent, _args, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const foundUser = await User.findById(context.user._id);
            if (!foundUser) {
                throw new Error('Cannot find a user with this id!');
            }
            return foundUser;
        },
        // Get a user by ID or username
        getSingleUser: async (_parent, { id, username }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: id }, { username }],
            });
            if (!foundUser) {
                throw new Error('Cannot find a user with this id or username!');
            }
            return foundUser;
        },
    },
    Mutation: {
        // Create a user and sign a token
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new Error('Something is wrong!');
            }
            const token = signToken(user.username, user.password, user._id);
            return { token, user };
        },
        // Login a user and sign a token
        login: async (_parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Wrong password!');
            }
            const token = signToken(user.username, user.password, user._id);
            return { token, user };
        },
        // Save a book to a user's savedBooks
        saveBook: async (_parent, { bookInput }, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedBooks: bookInput } }, { new: true, runValidators: true });
            return updatedUser;
        },
        // Remove a book from savedBooks
        removeBook: async (_parent, { bookId }, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, { new: true });
            if (!updatedUser) {
                throw new Error("Couldn't find user with this id!");
            }
            return updatedUser;
        },
    },
};
export default resolvers;