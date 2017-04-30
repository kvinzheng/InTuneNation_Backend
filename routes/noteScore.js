const express = require('express');
const knex = require('../knex');
const router = express.Router();
import getNoteAndOctave from './charts/converter';


router.get('/users/:userId/note-score/:keyNum', (req, res, next) => {
  knex('exercises')
    .where('user_id', req.params.userId)
    .join('scores', 'exercises.id', '=', 'scores.exercises_id')
    .select('exercises.id', 'exercises.notes_array', 'scores.score_array')
    .then((exercise_scores) => {
      let exScoreArray = json(exercise_scores);
      // loop through all exercises(convert to JSON) for matching keyNum
      // then take corresponding scores
      // call getNoteAndOctave() to convert keyNum to note & octave
      // return note, octave, and scores
      // average?
      // Example Return
      return {
        note: 'C',
        octave: 4,
        scores: [{
          score: 90.25,
          timestamp: date-time
        },
        {
          score: 88.25,
          timestamp: date-time
        }
      ]
      };
    })
    .catch((err) => {
      console.log(err);
    });
});





module.exports = router;
