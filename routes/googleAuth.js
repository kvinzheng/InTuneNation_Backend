const express = require('express');
const router = express.Router();

router.get( '/google',
  passport.authenticate( 'google', {
    state: 'SOME STATE'
  } ),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get( '/google/callback', passport.authenticate( 'google', {
  successRedirect: '/profile',
  failureRedirect: '/'
  } ),
  function ( req, res ) {
    res.redirect( '/' );
  }
);

// the route should either be in the auth router or in the user router. This is the wrong place for it.
router.get( '/logout', function( req, res ){
  req.logout();
  res.redirect( '/' );
} );
