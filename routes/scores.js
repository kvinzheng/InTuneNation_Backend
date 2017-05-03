const express = require('express');
const knex = require('../knex');
const router = express.Router();


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
    });
});

router.get('/users/:userId/exercises/:exId/scores/:scId', (req, res, next) => {
  knex('scores')
    .where({
      id: req.params.scId,
      user_id: req.params.userId,
      exercises_id: req.params.exId
    })
    .first()
    .then((user_score) => {
      res.json(user_score);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(404).send('Not Found');
    });
});

router.post('/users/:userId/exercises/:exId/scores', (req, res, next) => {
  knex('scores')
    .insert({
      user_id: req.params.userId,
      exercises_id: req.params.exId,
      scores_array: JSON.stringify(req.body.scores_array),
      avg_score: req.body.avg_score
    }, '*')
    .then((user_scores) => {
      delete user_scores[0].created_at;
      delete user_scores[0].updated_at;
      res.json(user_scores[0]);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(400).send('Invalid Input');
    });
});


module.exports = router;
