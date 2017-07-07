const express = require( 'express' );
const knex = require( '../knex' );
const router = express.Router();
const getNoteAndOctave = require( '../charts/converter' );

// User can get lifetime aver2age score for a single note based on a particular key number given.
router.get( '/users/:userId/note-score/:keyNum', ( req, res, next ) => {
  const keyNum = parseInt(req.params.keyNum);
  knex('exercises')
    .join('scores', 'exercises.id', '=', 'scores.exercises_id')
    .where('exercises.user_id', req.params.userId)
    .andWhere('scores.user_id', req.params.userId)
    .orderBy('scores.id', 'asc')
    .then((exercises) => {
      const filter = exercises.filter((exercise) => {
        const keyNumsArr = JSON.parse(exercise.notes_array);
        return keyNumsArr.indexOf(keyNum) > -1;
      });
      const scoreArraysCollection = [];
      const map = filter.map((exercise) => {
        const scoreIndices = [];
        const keyNumsArr = JSON.parse(exercise.notes_array);
        keyNumsArr.forEach((num, index) => {
          if (num === keyNum) { scoreIndices.push(index); }
        });
        const scoresArr = JSON.parse(exercise.scores_array);
        const scoresFilter = scoresArr.filter((score, index) => {
          return scoreIndices.indexOf(index) > -1;
        });
        exercise.key_num_scores_array = scoresFilter;
        scoreArraysCollection.push(scoresFilter);
        return exercise;
      });
      const scores = [];
      scoreArraysCollection.forEach((scoreArr) => {
        scoreArr.forEach(score => scores.push(score));
      });
      const scoreAvg = scores.reduce((a,b) => { return a + b; }) / scores.length;
      const avgScoreObj = {
        keyNum,
        scores,
        key_num_score_avg: scoreAvg,
      };
      map.push(avgScoreObj);
      // map.push(allScores);
      // console.log(map);
      res.json(avgScoreObj);
    })
    .catch((err) => {
      console.log(err);
      res.set( 'Content-type', 'text/plain' );
      res.status( 400 ).send( err );
    });
  // const promiseTwo
      // return filter;
    // .select('exercises.id', 'exercises.notes_array')
    // .join( 'scores', 'exercises.id', '=', 'scores.exercises_id' )
    // .select( 'exercises.id', 'exercises.notes_array', 'scores.score_array' )
    // .then((exercise_scores) => {
    //   res.json(exercise_scores);
      // loop through all exercises(convert to JSON) for matching keyNum
      // then take corresponding scores
      // call getNoteAndOctave() to convert keyNum to note & octave
      // return note, octave, and scores
      // average?
      // Example Return
      // return {
      //   note: 'C',
      //   octave: 4,
      //   scores: [
      //     {
      //     score: 90.25,
      //     timestamp: date-time
      //     },
      //     {
      //     score: 88.25,
      //     timestamp: date-time
      //     }
      //   ]
      // };


} );


module.exports = router;
