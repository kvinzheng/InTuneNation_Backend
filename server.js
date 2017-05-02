// reading environmental variable
if (process.envNODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.user(morgan('short'));
    break;

  default:
}

app.use(bodyParser());
app.use(cookieParser());
// const path = require('path');
//
// app.use(express.static(path.join('public')));

// CSRF protection
// app.use((req, res, next) => {
//   if (/json/.test(req.get('Accept'))) {
//     return next();
//   }
//
//   res.sendStatus(406);
// });
const users = require('./routes/users');
const exercises = require('./routes/exercises');
const scores = require('./routes/scores');
const noteScore = require('./routes/noteScore');

app.use(users);
app.use(exercises);
app.use(scores);
app.use(noteScore);

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
// app.use((err, _req, res, next) => {
//   if (err.output && err.output.statusCode) {
//     return res.status(err.output.statusCode).set('Content-type', 'text/plain').send(err.message);
//   }
//
//   console.error(err.stack);
//   res.sendStatus(500);
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
