"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_js_1 = require("../models/User.js"); // Adjust the import based on your file structure
var auth_js_1 = require("../services/auth.js"); // Import the signToken function
var resolvers = {
    Query: {
        // Get the current user
        me: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.user) {
                            throw new Error('Not authenticated');
                        }
                        return [4 /*yield*/, User_js_1.default.findById(context.user._id)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('Cannot find a user with this id!');
                        }
                        return [2 /*return*/, foundUser];
                }
            });
        }); },
        // Get a user by ID or username
        getSingleUser: function (_parent_1, _a) { return __awaiter(void 0, [_parent_1, _a], void 0, function (_parent, _b) {
            var foundUser;
            var id = _b.id, username = _b.username;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, User_js_1.default.findOne({
                            $or: [{ _id: id }, { username: username }],
                        })];
                    case 1:
                        foundUser = _c.sent();
                        if (!foundUser) {
                            throw new Error('Cannot find a user with this id or username!');
                        }
                        return [2 /*return*/, foundUser];
                }
            });
        }); },
    },
    Mutation: {
        // Create a user and sign a token
        addUser: function (_parent_1, _a) { return __awaiter(void 0, [_parent_1, _a], void 0, function (_parent, _b) {
            var user, token;
            var username = _b.username, email = _b.email, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, User_js_1.default.create({ username: username, email: email, password: password })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new Error('Something is wrong!');
                        }
                        token = (0, auth_js_1.signToken)(user.username, user.password, user._id);
                        return [2 /*return*/, { token: token, user: user }];
                }
            });
        }); },
        // Login a user and sign a token
        login: function (_parent_1, _a) { return __awaiter(void 0, [_parent_1, _a], void 0, function (_parent, _b) {
            var user, correctPw, token;
            var username = _b.username, email = _b.email, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, User_js_1.default.findOne({ $or: [{ username: username }, { email: email }] })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new Error("Can't find this user");
                        }
                        return [4 /*yield*/, user.isCorrectPassword(password)];
                    case 2:
                        correctPw = _c.sent();
                        if (!correctPw) {
                            throw new Error('Wrong password!');
                        }
                        token = (0, auth_js_1.signToken)(user.username, user.password, user._id);
                        return [2 /*return*/, { token: token, user: user }];
                }
            });
        }); },
        // Save a book to a user's savedBooks
        saveBook: function (_parent_1, _a, context_1) { return __awaiter(void 0, [_parent_1, _a, context_1], void 0, function (_parent, _b, context) {
            var updatedUser;
            var bookInput = _b.bookInput;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!context.user) {
                            throw new Error('Not authenticated');
                        }
                        return [4 /*yield*/, User_js_1.default.findByIdAndUpdate(context.user._id, { $addToSet: { savedBooks: bookInput } }, { new: true, runValidators: true })];
                    case 1:
                        updatedUser = _c.sent();
                        return [2 /*return*/, updatedUser];
                }
            });
        }); },
        // Remove a book from savedBooks
        removeBook: function (_parent_1, _a, context_1) { return __awaiter(void 0, [_parent_1, _a, context_1], void 0, function (_parent, _b, context) {
            var updatedUser;
            var bookId = _b.bookId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!context.user) {
                            throw new Error('Not authenticated');
                        }
                        return [4 /*yield*/, User_js_1.default.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId: bookId } } }, { new: true })];
                    case 1:
                        updatedUser = _c.sent();
                        if (!updatedUser) {
                            throw new Error("Couldn't find user with this id!");
                        }
                        return [2 /*return*/, updatedUser];
                }
            });
        }); },
    },
};
exports.default = resolvers;
