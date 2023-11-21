const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
// require('dotenv');
// const secret = process.env.SECRET;
// const expiration = process.env.EXPIRATION;

// set token secret and expiration date
const secret = 'supersupersupersecret';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
