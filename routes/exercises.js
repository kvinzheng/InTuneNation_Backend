const express = require('express');
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/exercises.js');

const router = express.Router();

router.get('/users/:userId/exercises', (req, res, next) => {
  knex('exercises')
    .where('user_id', req.params.userId)
    .orderBy('id', 'asc')
    .then((user_exercises) => {
      if(!user_exercises.length) {
        throw new Error('Not Found');
      }
      res.json(user_exercises);
    })
    .catch(() => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
    });
});

router.get('/users/:userId/exercises/:exId', (req, res, next) => {
  knex('exercises')
    .where({
      id: req.params.exId,
      user_id: req.params.userId,
    })
    .first()
    .then((user_exercise) => {
      if(!user_exercise){
        throw new Error('Not Found');
      }
      res.json(user_exercise);
    })
    .catch(() => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
    });
});

// insert exercises
router.post('/users/:userId/exercises', ev(validations.post), (req, res, next) => {
  knex('exercises')
    .where('notes_array', '=', JSON.stringify(req.body.notes_array))
    .where('user_id', req.params.userId)
    .first()
    .then((match) => {
      if (match) {
        res.json(match);
      } else {
        knex('exercises')
          .insert({
            user_id: req.params.userId,
            notes_array: JSON.stringify(req.body.notes_array),
          }, '*')
          .then((user_exercise) => {
            delete user_exercise[0].created_at;
            delete user_exercise[0].updated_at;
            res.json(user_exercise[0]);
          });
      }
    })
    .catch(() => {
      res.set('Content-type', 'text/plain');
      res.status(400).send('Invalid Input');
    });
});

module.exports = router;
