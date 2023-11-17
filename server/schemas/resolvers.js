const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Matches the typeDefs entry point and informs the request of the relevant data
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
            return userData;
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
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } }
            );

            return updatedUser;
            }
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { books: { savedBooks: { bookId } } } },
                { new: true }
            );
            return updatedUser;
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers; 