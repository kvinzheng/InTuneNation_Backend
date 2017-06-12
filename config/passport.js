const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const configAuth = require('./auth.js');
require('dotenv').config();

// const passportInfo = ( passport ) => {
//   passport.use( new GoogleStrategy( {
//     clientID: process.env.clientID,
//     clientSecret: process.env.clientSecret,
//     callbackURL: configAuth.googleAuth.callbackURL
//   }, ( token, accessToken, refreshToken, profile, done ) => {
//     process.nextTick( () => {
//       console.log( profile );
//       const user = {
//         first_name: profile.name.givenName,
//         last_name: profile.name.familyName,
//         email: profile.emails[ 0 ].value
//       };
//       done( null, user );
//     } );
//   } ) );
// }

passport.use(new GoogleStrategy({
    clientID:    process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log('here?');
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passportInfo;
