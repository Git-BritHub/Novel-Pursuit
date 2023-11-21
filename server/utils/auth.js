const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv');
// set token secret and expiration date
const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log(payload)
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
