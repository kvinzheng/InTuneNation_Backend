const express = require('express');
const knex = require('../knex');
const router = express.Router();

//validations
const ev = require('express-validation');
const validations = require('../validations/exercises.js');

router.get('/users/:userId/exercises', (req, res, next) => {
  knex('exercises')
    // .select('exercises.id', 'exercises.notes_array')
    .where('user_id', req.params.userId)
    .orderBy('id', 'asc')
    .then((user_exercises) => {
      res.json(user_exercises);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
    });
});


router.get('/users/:userId/exercises/:exId', (req, res, next) => {
  knex('exercises')
    .where({
      id: req.params.exId,
      user_id: req.params.userId
    })
    .first()
    .then((user_exercise) => {
      res.json(user_exercise);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
    });
});

//insert exercises
router.post('/users/:userId/exercises', ev(validations.post), (req, res, next) => {
  knex('exercises')
    .where('notes_array', '=', JSON.stringify(req.body.notes_array))
    .where('user_id', req.params.userId)
    .first()
    .then((match) => {
      if(match) {
        res.json(match);
      }
      else {
        knex('exercises')
          .insert({
            user_id: req.params.userId,
            notes_array: JSON.stringify(req.body.notes_array)
          }, '*')
          .then((user_exercise) => {
            delete user_exercise[0].created_at;
            delete user_exercise[0].updated_at;
            res.json(user_exercise[0]);
          });
      }
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(400).send('Invalid Input');
    });
});



module.exports = router;
