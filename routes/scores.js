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
    });
});

// User can get a particular score from the score combination of a particular exercise instance.
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

function average(arr) {
    var sums = {}, counts = {}, results = [], user_id, first_name, profile_picture, user_profile = {} ;
    for (var i = 0; i < arr.length; i++) {
        user_id = arr[i].user_id;
        first_name = arr[i].first_name;
        profile_picture = arr[i].profile_picture;

        user_profile[user_id] = { first_name, profile_picture };

        if (!(user_id in sums)) {
            sums[user_id] = 0;
            counts[user_id] = 0;
        }
        sums[user_id] += arr[i].avg_score;
        counts[user_id]++;
    }

    for(user_id in sums) {
        results.push({ user_id: user_id, avg_score: sums[user_id] / counts[user_id] , first_name: user_profile[user_id]['first_name'] , profile_picture: user_profile[user_id]['profile_picture']});
    }
    return results;
}

router.get('/users/averagelifetimescore', (req, res, next) => {
  // console.log('here?');
  knex('scores').fullOuterJoin('users', 'scores.user_id', 'users.id')
    .then((match) => {
      let averageArr = match.map( ele => { return { user_id: ele.user_id, avg_score: ele.avg_score, first_name: ele.first_name, profile_picture: ele.profile_picture } } );
      // console.log('what is averageArr',averageArr);
      let result = average(averageArr).sort( (a,b) => { return b.avg_score - a.avg_score; } );
      res.json(result);
    })
    .catch((err) => {
      res.set('Content-type', 'text/plain');
      res.status(400).send('Invalid Input');
    });
});

// User can post new score combinations (and average score of the new score combination) to a particular exercise type.
router.post('/users/:userId/exercises/:exId/scores', ev(validations.post),(req, res, next) => {
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
