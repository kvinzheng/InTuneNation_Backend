const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const knex = require('../knex');
const session = require('express-session')
const express = require('express');
const RedisStore = require('connect-redis')(session);
const app = express();
const morgan = require('morgan');
const router = express.Router();
const queryString = require('query-string');
const jwt = require( 'jsonwebtoken' );

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

let newUser;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALL_BACK_URL,
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
  newUser = {
    first_name: profile.name.givenName,
    last_name: profile.name.familyName,
    email: profile.email,
    hashed_password: 'null',
    profile_picture: profile.photos[0].value
  }

  knex('users').where('email', newUser.email).first().then((user) => {
    if (user) {
      //user exist in the user table
      knex('users').update(newUser, '*').where('email', newUser.email).then(result => console.log('result is', result));
      return done(null, newUser);
    } else {
      // user hasn't been in the user table yet
      knex('users').insert((newUser), '*').catch((err) => console.log('Google did not authenticate you'));
      return done(null, newUser);
    }
  });
}));

router.use(session({
  secret: 'cookie_secret',
  name: 'kaas',
  store: new RedisStore({host: '127.0.0.1', port: 6379}),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure'
}));

router.get('/auth/google/success', (req, res, next) => {
  let result;
  knex('users').where('email', newUser.email).first().then((user) => {
    result = user;
    let claim = {
      userId: result.id
    };
    let token = jwt.sign( claim, process.env.JWT_KEY, {
      expiresIn: '7 days'
    } );
    result.token = token;

    let string = encodeURIComponent(JSON.stringify(result));
    res.redirect('http://localhost:3000/profile/?' + string);
  });

});
router.get('/auth/google/failure', (req, res, next) => {
  return res.json('user is not authenticated yet');
});

module.exports = {
  googleRouter: router
};
