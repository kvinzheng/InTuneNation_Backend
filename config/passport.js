const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const configAuth = require('./auth.js');

const passportInfo = (passport) => {

  console.log('am i running slow');
  console.log('what is ID', configAuth.googleAuth.clientID);
  console.log('what is clientSecret', configAuth.googleAuth.clientSecret);
  console.log('what is callbackURL,', configAuth.googleAuth.callbackURL)
  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  }, (token, accessToken, refreshToken, profile, done) => {
    console.log('am i running this?');
    process.nextTick(() => {
      console.log(profile);
      const user = {
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value
      };
      done(null, user);
    });
  }));
}

module.exports = passportInfo;
