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
const {googleRouter} = require('./config/passport.js');
const knex = require('./knex');

app.disable('x-powered-by');

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

const {middlewareVerify} = require('./middlewares/verifications.js');
app.use('/users', middlewareVerify);
//app.user(users) only apply for login & sign up & get all user

//this doesn't apply the middlewares;
app.use(googleRouter); //applying google OAuth Routes
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
