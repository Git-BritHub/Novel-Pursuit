const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server');
const { signToken } = require('../utils/auth');

// Matches the typeDefs entry point and informs the request of the relevant data
const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
        books: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Book.find(params);
        },
    },
    Mutation: {

    },
};

module.exports = resolvers; 