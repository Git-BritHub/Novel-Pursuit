const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Matches the typeDefs entry point and informs the request of the relevant data
const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return User.findOne({ username });
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookData, bookId }) => {
            const book = await Book.create({ bookData, bookId });

            await User.findOneAndUpdate(
                { username: bookData },
                { $addToSet: { books: book._id } }
            );

            return book;
        },
        removeBook: async (parent, { bookId, bookData }) => {
            return Book.findOneAndUpdate(
                { _id: bookId },
                { $pull: { books: { _id: bookId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers; 