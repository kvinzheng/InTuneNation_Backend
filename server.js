// reading environmental variable
if (process.envNODE_ENV !== 'production') {
  require('dotenv').config();
}
const session = require('express-session')
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const user = require('./routes/users');
const configAuth = require('./config/auth');
const exercises = require('./routes/exercises');
const scores = require('./routes/scores');
const noteScore = require('./routes/noteScore');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const knex = require('./knex');
const RedisStore = require('connect-redis')(session);

app.disable('x-powered-by');

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
} else if (app.get('env') === 'development') {
  app.use(morgan('short'));
}

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

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
      return done(null, newUser);
      // return;
    } else {
      // user hasn't been in the user table yet
      knex('users').insert((newUser), '*').catch((err) => console.log('Google did not authenticate you'));
      return done(null, newUser);
    }
  });
}));

app.use(session({
  secret: 'cookie_secret',
  name: 'kaas',
  store: new RedisStore({host: '127.0.0.1', port: 6379}),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure'
}));
app.get('/auth/google/success', (req, res, next) => {
  return res.json(newUser);
});
app.get('/auth/google/failure', (req, res, next) => {
  return res.json('user is not authenticated yet');
});

const {middlewareVerify} = require('./middlewares/verifications.js');
app.use('/users', middlewareVerify);
//app.user(users) only apply for login & sign up & get all user
//this doesn't apply the middlewares;
app.use(user);
app.use(exercises);
app.use(scores);
app.use(noteScore);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).set('Content-Type', 'text/plain').send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
