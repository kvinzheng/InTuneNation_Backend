// reading environmental variable
if (process.envNODE_ENV !== 'production') {
  require('dotenv').config();
}

const middlewareVerify = require('./middlewares/verifications.js');
const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const configAuth = require('./config/auth');
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
// console.log('what is middlewareVerify', middlewareVerify);
// app.use('/users', middlewareVerify);

//GOOGLE auth
// app.use(passport.initialize());
// app.use(passport.session());
//
//
//
// const cookieSession = require('cookie-session')
// app.use(cookieSession({ secret: 'keyboard cat' }));
// // this wires up passport's session code to your session
// app.use(passport.session())
// app.use('/auth', auth);
//Google Auth


app.use(users);
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
