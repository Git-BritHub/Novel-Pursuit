const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
  }

input bookInput {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type Query {
    me: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(bookData: bookInput!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;