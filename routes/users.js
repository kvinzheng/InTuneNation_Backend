const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bodyParser = require('body-parser');
const { camelizeKeys, decamelizeKeys } = require('humps');
const  { middlewareVerify } = require('../middlewares/verifications.js');
const router = express.Router();

router.get('/users', function middlewareVerify(req, res, next){
  console.log("what is cookie?", req.headers);
  jwt.verify(req.headers.cookie.substring(5), process.env.JWT_KEY, (err, payload) => {
    if (err) {
      console.log('did i make an error?');
      res.status(401);
      res.send({ status: 401, ErrorMessage: 'Unauthorized' });
    }
    else{
      tokenId = payload.userId;
      next();
    }
  });
});

router.get('/users', (req, res, next) => {
  return knex('users').select('id', 'first_name', 'last_name', 'email').then((users) => {
    res.json(users);
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/users', (req, res, next) => {
  if (req.body.email === undefined) {
    res.set('Content-type', 'text/plain');
    res.status(400).send('Email must not be blank');
  }
  else if (req.body.password === undefined || req.body.password.length < 8) {
    res.set('Content-type', 'text/plain');
    return res.status(400).send('Password must be at least 8 characters long');
  }
  else {
    knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (user) {
        res.set('Content-type', 'text/plain');
        res.status(400).send('Email already exist!');
      }
      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedPassword) => {
      const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: hashedPassword
      }
      return knex('users').insert((newUser), '*');
    })
    .then((insertedUser) => {
      const camelizedUser = camelizeKeys(insertedUser[0]);
      const claim = {
        userId: camelizedUser.id
      };
      const token = jwt.sign(claim, process.env.JWT_KEY, {expiresIn: '7 days'});

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        secure: router.get('env') === 'production'
      });

      delete camelizedUser.hashedPassword;
      delete camelizedUser.createdAt;
      delete camelizedUser.updatedAt;
      res.set('Content-type', 'application/json');
      res.status(200).send(camelizedUser);

    }, middlewareVerify )
    .catch((error) => {
      next(error);
    });
  }
});

module.exports = router;
