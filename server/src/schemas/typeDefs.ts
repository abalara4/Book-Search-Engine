import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # User type definition
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  # Book type definition
  type Book {
    bookId: ID!
    authors: [String]!
    description: String
    title: String!
    image: String
    link: String
  }

  # Auth type definition for login and signup
  type Auth {
    token: ID!
    user: User
  }

  # Input type for saving a book
  input BookInput {
    authors: [String]!
    description: String
    title: String!
    bookId: ID!
    image: String
    link: String
  }

  # Query type definition
  type Query {
    me: User
    getSingleUser(id: ID, username: String): User
  }

  # Mutation type definition
  type Mutation {
    login(username: String, email: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

export default typeDefs;