const express = require('express');
const knex = require('../knex');
const router = express.Router();
import getNoteAndOctave from './charts/converter';


router.get('/users/:userId/note-score/:keyNum', (req, res, next) => {
  knex('exercises')
    .join('scores', 'exercises.id', '=', 'scores.exercises_id')
    .select('exercises.id', 'exercises.notes_array', 'scores.score_array')
    .where()
    .then((exercise_scores) => {
      let exScoreArray = json(exercise_scores);
      // loop through all exercises for matching keyNum
      // then take corresponding scores
      // call getNoteAndOctave() to convert keyNum to note & octave
      // return note, octave, and scores
      // average?
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
