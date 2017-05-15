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


// app.use('/users', middlewareVerify);
//app.user(users) only apply for login & sign up & get all user
//this doesn't apply the middlewares;
app.use( user );
app.use( exercises );
app.use( scores );
app.use( noteScore );

app.use( ( req, res ) => {
    res.sendStatus( 404 );
} );


const port = process.env.PORT || 8000;

app.listen( port, () => {
    if ( app.get( 'env' ) !== 'test' ) {
        console.log( 'Listening on port', port );
    }
} );

module.exports = app;
