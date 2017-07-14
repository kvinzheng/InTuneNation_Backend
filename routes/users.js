// eslint-space-in-parens
const passport = require( 'passport' );
const bcrypt = require( 'bcrypt-as-promised' );
const express = require( 'express' );
const jwt = require( 'jsonwebtoken' );
const knex = require( '../knex' );
const bodyParser = require( 'body-parser' );
const {
    camelizeKeys,
    decamelizeKeys
} = require( 'humps' );
const {
    middlewareVerify
} = require( '../middlewares/verifications.js' );

const router = express.Router();

//validations
const ev = require('express-validation');
const validations = require('../validations/users.js');
// console.log('what is validations', validations);
// router.post('/users/login', middlewareVerify);
// router.post('/user/signup', middlewareVerify);

// require( '../config/passport' )( passport );

// passport.serializeUser( (user, done ) => {
//   done( null, user );
// });
// passport.deserializeUser( ( obj, done ) => {
//   done( null, obj );
// });

// See all user information
router.get( '/user', ( req, res, next ) => {
  return knex( 'users' ).select( 'id', 'first_name', 'last_name', 'email', 'profile_picture' ).then( ( users ) => {
    res.json( users );
  }).catch( ( err ) => {
    next( err );
  });
});

// User can log into their account.
router.post('/user/login', ev(validations.post),(req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if ( !email || !email.trim() ) {
    return res.status(400).send( 'The email field must not be blank.' );
  }

  if ( !password || !password.trim() ) {
    return res.status( 400 ).send( 'The password field must not be blank.' );
  }

  let authUser;

  knex( 'users' ).where( 'email', email ).first().then( ( user ) => {
    if ( !user ) {
      return res.status( 400 ).send( 'Invalid email or password.' );
    }

    authUser = camelizeKeys( user );
    return bcrypt.compare( req.body.password, authUser.hashedPassword )
  }).then( ( match ) => {
    if ( match === false ) {
      return res.status( 400 ).send( 'Invalid email or password.' );
    }
    const claim = {
      userId: authUser.id
    };
    const token = jwt.sign( claim, process.env.JWT_KEY, {
      expiresIn: '7 days'
    } );
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    //   secure: router.get('env') === 'production'
    // });

    delete authUser.hashedPassword;
    delete authUser.createdAt;
    delete authUser.updatedAt;
    authUser.token = token;
    res.set('token', token);
    console.log('what is authUser', authUser);
    res.send(authUser);
  }).catch((err) => {
    res.status(400).send('Invalid email or password.');
    // next(err);
  });
});

// User can sign up for a new account with our database.
router.post( '/user/signup', ev(validations.post), ( req, res, next ) => {
  if ( req.body.email === undefined ) {
    //if the user's email doesn't exist, then i will send a 400 response
    res.set( 'Content-type', 'text/plain' );
    res.status( 400 )
      .send( 'The email field must not be blank.' );
  } else if ( req.body.password === undefined || req.body.password.length < 8) {
    //if the user password doesn't exist, then i will send a 400 response
    res.set('Content-type', 'text/plain');
    return res.status(400)
      .send('Please make sure that the password is at least 8 characters long.');
  } else {
    //posting the email and password and send a 400 response if the email exist already
    knex( 'users' ).where( 'email', req.body.email ).first().then( (user) => {
      if ( user ) {
        res.set( 'Content-type', 'text/plain' );
        res.status( 400 ).send( 'An account with this email address already exists.' );
      }
      return bcrypt.hash( req.body.password, 12 );
    }).then( ( hashedPassword ) => {
      const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: hashedPassword
      }
      return knex( 'users' ).insert( ( newUser ), '*');
    }).then( ( insertedUser ) => {
      let camelizedUser = camelizeKeys( insertedUser[ 0 ] );
      const claim = {
        userId: camelizedUser.id
      };
      const token = jwt.sign( claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      // res.cookie('token', token, {
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      //   secure: router.get('env') === 'production'
      // });
      delete camelizedUser.hashedPassword;
      delete camelizedUser.createdAt;
      delete camelizedUser.updatedAt;
      camelizedUser.token = token;

      res.set('Content-type', 'application/json');
      res.set('token', token);
      res.status(200).send(camelizedUser);

    }).catch((error) => {
      res.status(400).send('Invalid Input.');
    });
  }
});

module.exports = router;
