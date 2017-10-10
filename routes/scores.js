const express = require('express');
const knex = require('../knex');
const router = express.Router();
//validations
const ev = require('express-validation');
const validations = require('../validations/scores.js');
// User can get score combinations from a particular exercise
router.get('/users/:userId/exercises/:exId/scores', (req, res, next) => {
  knex('scores')
    .where({
      user_id: req.params.userId,
      exercises_id: req.params.exId
    })
    .orderBy('id', 'asc')
    .then((user_scores) => {
      res.json(user_scores);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
      next(err);
    });
});

// User can get a particular score from the score combination of a particular exercise instance.
router.get('/users/:userId/exercises/:exId/scores/:scId', (req, res, next) => {
  knex('scores')
    .where({
      id: req.params.scId,
      user_id: req.params.userId,
      exercises_id: req.params.exId,
    })
    .first()
    .then((user_score) => {
      res.json(user_score);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
      next(err);
    });
});

// User can post new score combinations (and average score of the new score combination) to a particular exercise type.
router.post('/users/:userId/exercises/:exId/scores', ev(validations.post), (req, res, next) => {
  knex('scores')
    .insert({
      user_id: req.params.userId,
      exercises_id: req.params.exId,
      scores_array: JSON.stringify(req.body.scores_array),
      avg_score: req.body.avg_score,
    }, '*')
    .then((user_scores) => {
      delete user_scores[0].created_at;
      delete user_scores[0].updated_at;
      res.json(user_scores[0]);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(400).send('Invalid Input');
      next(err);
    });
});


module.exports = router;
