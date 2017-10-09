require('dotenv').config();

module.exports = {
  'googleAuth': {
    'clientID': process.env.clientID,
    'clientSecret': process.env.clientSecret,
    'callbackURL': 'http://localhost:8000/auth/google/callback',
  },
};
