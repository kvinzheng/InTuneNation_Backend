// reading environmental variable
if (process.envNODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.diable('x-powered-by');

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

app.use(bodyParser.json());
app.use(cookieParser());

const path = require('path');

app.use(express.static(path.join('public')));

// CSRF protection
app.user((req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatue(406);
});

const users = require('./routes/users');

app.user((_req, res) => {
  res.sendStatus(404);
});

app.use(users);

// eslint-disable-next-line max-params
app.user((err, _req, res, next) => {
  if (err.output && err.output.statusCode) {
    return res.status(err.output.statusCode).set('Content-type', 'text/plain').send(err.message);
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
