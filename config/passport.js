const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const configAuth = require('./auth');
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){

    })
  }
));

passport.serializeUser((object, done) => {
  done(null, {token: object.token, id: object.profile.id})
})

passport.deserializeUser((object, done) => {
  User.findById(object.id).then(user => {
    done(null, user)
  })
})
