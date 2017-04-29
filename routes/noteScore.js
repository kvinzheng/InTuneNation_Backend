const express = require('express');
const knex = require('../knex');
const router = express.Router();
import getTeoriaNote from './charts/converter';


router.get('/users/:userId/note-score/:keyNum', (req, res, next) => {
  knex('exercises')
    .join('scores', 'exercises.id', '=', 'scores.exercises_id')
    .select('exercises.id', 'exercises.notes_array', 'scores.score_array')
    .then((exercise_scores) => {
      let exScoreArray = json(exercise_scores);
      // loop through all exercises for matching keyNum
      // then take corresponding scores
      // call getTeoriaNote() to convert keyNum to tNote
      // return tNote and note scores
      // average? 
    })
    .catch((err) => {
      console.log(err);
    });
});





module.exports = router;
