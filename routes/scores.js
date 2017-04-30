const express = require('express');
const knex = require('../knex');
const router = express.Router();


router.get('/users/:userId/exercises/:exId/scores', (req, res, next) => {
  knex('scores')
    .select()
    .where({
      user_id: req.params.userId,
      exercises_id: req.params.exId
    })
    .then((user_scores) => {
      res.json(user_scores);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/users/:userId/exercises/:exId/scores/:scId', (req, res, next) => {
  knex('scores')
    .select()
    .where({
      id: req.params.scId,
      exercises_id: req.params.exId
    })
    .first()
    .then((user_score) => {
      res.json(user_score);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/users/:userId/exercises/:exId/scores', (req, res, next) => {
  knex('scores')
    .insert({
      exercises_id: req.params.exId,
      score_array: JSON.stringify(req.body.scoreArray),
      avg_score: req.body.avgScore
    })
    .then((user_scores) => {
      res.json(user_scores);
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
