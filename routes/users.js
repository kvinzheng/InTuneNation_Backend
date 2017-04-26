const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.post('/users', (req, res, next) => {
  const { email, password } = req.body;

  if (req.body.email === undefined) {
    res.set('Content-type', 'text/plain');
    res.status(400).send('Email must not be blank');
  } else if (req.body.password === undefined || req.body.password.length < 8) {
    res.set('Content-type', 'text/plain');
    return res.status(400).send('Password must be at least 8 characters long');
  } else {
    knex('users')
      .where('email', email)
      .first()
      .then((user) => {
        if (user) {
          throw boom.create(400, 'Email already exists');
        }

        return bcrypt.hash(password, 12);
      })
      .then((hashedPassword) => {
        const { firstName, lastName } = req.body;
        const insertUser = { firstName, lastName, email, hashedPassword };

        return knex('users').insert(decamelizeKeys(insertUser), '*');
      })
      .then((rows) => {
        const user = camelizeKeys(rows[0]);
        const claim = { userId: user.id };
        const token = jwt.sign(claim, process.env.JWT_KEY, {
          expiresIn: '7 days',
        });

        res.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
          secure: router.get('env') === 'production'
        });

        delete user.hashedPassword;

        res.send(user);
      })
      .catch((err) => {
        next(err);
      });
  }
});

module.exports = router;
