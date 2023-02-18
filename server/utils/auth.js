const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

//Authentication Middleware 
module.exports = {
  authMiddleware: function ({ req }) {
    // Passing around the token on either the header or the body
    let token = req.body.token || req.query.token || req.headers.authorization;

    //or/and The token is going to be part of the headers
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      //Its going to look for the JSON web token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
