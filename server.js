// reading environmental variable
if ( process.envNODE_ENV !== 'production' ) {
    require( 'dotenv' ).config();
}

const express = require( 'express' );
const cors = require( 'cors' );
const passport = require( 'passport' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const morgan = require( 'morgan' );
const app = express();

<<<<<<< HEAD
const user = require('./routes/users');
const configAuth = require('./config/auth');
const exercises = require('./routes/exercises');
const scores = require('./routes/scores');
const noteScore = require('./routes/noteScore');

app.disable('x-powered-by');

if ( app.get('env') === 'development' ) {
  app.user( morgan( 'dev' ) );
}
else if ( app.get('env') === 'development' ){
    app.use( morgan( 'short' ) );
}

app.use( cors() );
app.options( '*', cors() );
=======
const {
    middlewareVerify
} = require( './middlewares/verifications.js' );
// where is your middleware being used?
const user = require( './routes/users' );
const configAuth = require( './config/auth' );
const exercises = require( './routes/exercises' );
const scores = require( './routes/scores' );
const noteScore = require( './routes/noteScore' );

app.disable( 'x-powered-by' );

// the switch isn't the best option when you only have 2 options.
// use and if / else here instead
switch ( app.get( 'env' ) ) {
case 'development':
    app.use( morgan( 'dev' ) );
    break;

case 'production':
    app.use( morgan( 'short' ) );
    break;

default:
}


app.use( cors() );
app.options( '*', cors() );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: true
} ) );
app.use( cookieParser() );
app.use( passport.initialize() );
>>>>>>> 8837da1403c357ab626617dfe51576fcfb1daa21

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: true
} ) );
app.use( cookieParser() );
app.use( passport.initialize() );

const {
  middlewareVerify
} = require('./middlewares/verifications.js');
app.use('/users', middlewareVerify);
//app.user(users) only apply for login & sign up & get all user
//this doesn't apply the middlewares;
app.use( user );
app.use( exercises );
app.use( scores );
app.use( noteScore );

<<<<<<< HEAD
app.use( ( _req, res ) => {
  res.sendStatus( 404 );
});
=======
app.use( ( req, res ) => {
    res.sendStatus( 404 );
} );
>>>>>>> 8837da1403c357ab626617dfe51576fcfb1daa21

app.use( ( err, _req, res, _next ) =>{
  if ( err.status ) {
    return res
    .status( err.status)
    .set( 'Content-Type', 'text/plain' )
    .send( err.message );
  }
  console.error( err.stack );
  res.sendStatus( 500 );
});

const port = process.env.PORT || 8000;

app.listen( port, () => {
<<<<<<< HEAD
  if ( app.get('env') !== 'test' ) {
    console.log('Listening on port', port);
  }
});
=======
    if ( app.get( 'env' ) !== 'test' ) {
        console.log( 'Listening on port', port );
    }
} );
>>>>>>> 8837da1403c357ab626617dfe51576fcfb1daa21

module.exports = app;
