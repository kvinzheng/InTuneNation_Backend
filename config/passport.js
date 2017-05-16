<<<<<<< HEAD
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const configAuth = require('./auth.js');
require('dotenv').config();

const passportInfo = ( passport ) => {
  passport.use( new GoogleStrategy( {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  }, ( token, accessToken, refreshToken, profile, done ) => {
    process.nextTick( () => {
      console.log( profile );
      const user = {
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[ 0 ].value
      };
      done( null, user );
    } );
  } ) );
=======
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
const configAuth = require( './auth.js' );

const passportInfo = ( passport ) => {
    passport.use( new GoogleStrategy( {
        // use process.env to store clientID
        clientID: configAuth.googleAuth.clientID,
        // use process.env to store clientSecret 
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    }, ( token, accessToken, refreshToken, profile, done ) => {
        process.nextTick( () => {
            console.log( profile );
            const user = {
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: profile.emails[ 0 ].value
            };
            done( null, user );
        } );
    } ) );
>>>>>>> 8837da1403c357ab626617dfe51576fcfb1daa21
}

module.exports = passportInfo;
