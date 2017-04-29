const express = require('express');
const knex = require('../knex');
const router = express.Router();


router.get('/users/:userId/exercises', (req, res, next) => {
  knex('exercises')
    .select()
    .where('user_id', req.params.userId)
    .then((user_exercises) => {
      res.json(user_exercises);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get('/users/:userId/exercises/:exId', (req, res, next) => {
  knex('exercises')
    .select()
    .where({
      id: req.params.exId,
      user_id: req.params.userId
    })
    .first()
    .then((user_exercise) => {
      res.json(user_exercise);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post('/users/:userId/exercises', (req, res, next) => {
  knex('exercises')
    .insert({
      user_id: req.params.userId,
      notes_array: JSON.stringify(req.body.notesArray)
    })
    .then((user_exercises) => {
      res.json(user_exercises);
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
