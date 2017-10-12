require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const knex = require('../knex');
const session = require('express-session');
const express = require('express');

const app = express();
const morgan = require('morgan');

const router = express.Router();

const jwt = require('jsonwebtoken');

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

let newUser;
// apply passport google oauth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALL_BACK_URL,
  // localhost:8000 is default port if running locally
  passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => {
  newUser = {
    first_name: profile.name.givenName,
    last_name: profile.name.familyName,
    email: profile.email,
    hashed_password: 'GoogleOAuth',
    profile_picture: profile.photos[0].value,
  };

  knex('users').where('email', newUser.email).first().then((user) => {
    if (user) {
      // user exist in the user table
      knex('users').update(newUser, '*').where('email', newUser.email)
      .then(result => console.log('result is', result));
      return done(null, newUser);
    } else {
      // user hasn't been in the user table yet
      knex('users').insert((newUser), '*')
      .catch((err) => console.log('Google did not authenticate you'));
      return done(null, newUser);
    }
  });
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'],
}));
// google oauth url
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure',
}));
//  success redirect
router.get('/auth/google/success', (req, res) => {
  let result;
  knex('users').where('email', newUser.email).first().then((user) => {
    result = user;
    const claim = {
      userId: result.id,
    };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days',
    });
    result.token = token;

    const string = encodeURIComponent(JSON.stringify(result));
    res.redirect(`https://intunenation.herokuapp.com/interface/?${string}`);
  });
});
// failure redirect
router.get('/auth/google/failure', (req, res) => res.json('user is not authenticated yet'));

module.exports = {
  googleRouter: router,
};
