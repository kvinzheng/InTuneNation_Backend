process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect, assert } = require('chai');

const server = require('../server.js');
const knex = require('../knex.js');

beforeEach(done => {
  knex.migrate.latest()
  .then(() => {
    return knex.seed.run()
  })
  .then(() => {
    done();
  })
  .catch((err) => {
    done(err);
  });
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});


describe('scores seeds', () => {

it('scores rows', (done) => {
  knex('scores').orderBy('id', 'ASC')
  .then((actual) => {
    const expected = [
      {
        id: 1,
        user_id: 1,
        exercises_id: 1,
        scores_array: '[79,91,86]',
        avg_score: 85.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        user_id: 2,
        exercises_id: 1,
        scores_array: '[77,88,85]',
        avg_score: 83.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        user_id: 2,
        exercises_id: 2,
        scores_array: '[88,91,86,93]',
        avg_score: 89.5,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 4,
        user_id: 2,
        exercises_id: 2,
        scores_array: '[79,88,84,90]',
        avg_score: 85.25,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 5,
        user_id: 2,
        exercises_id: 3,
        scores_array: '[89,88,85,96,80]',
        avg_score: 87.6,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 6,
        user_id: 2,
        exercises_id: 3,
        scores_array: '[79,77,82,85,81]',
        avg_score: 80.8,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 7,
        user_id: 2,
        exercises_id: 3,
        scores_array: '[90,88,80,83,81]',
        avg_score: 80.8,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 8,
        user_id: 2,
        exercises_id: 3,
        scores_array: '[77,79,82,83,82]',
        avg_score: 84.4,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 9,
        user_id: 2,
        exercises_id: 3,
        scores_array: '[66,82,75,79,80]',
        avg_score: 76.4,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 10,
        user_id: 1,
        exercises_id: 6,
        scores_array: '[88,82,78]',
        avg_score: 82.67,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 11,
        user_id: 1,
        exercises_id: 6,
        scores_array: '[91,83,86]',
        avg_score: 86.67,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 12,
        user_id: 1,
        exercises_id: 6,
        scores_array: '[79,87,78]',
        avg_score: 81.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 13,
        user_id: 1,
        exercises_id: 6,
        scores_array: '[68,82,73]',
        avg_score: 74.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 14,
        user_id: 3,
        exercises_id: 5,
        scores_array: '[82,79]',
        avg_score: 80.5,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 15,
        user_id: 3,
        exercises_id: 5,
        scores_array: '[84,82]',
        avg_score: 83,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 16,
        user_id: 3,
        exercises_id: 5,
        scores_array: '[93,89]',
        avg_score: 91,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 17,
        user_id: 3,
        exercises_id: 5,
        scores_array: '[92,94]',
        avg_score: 93,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 18,
        user_id: 3,
        exercises_id: 5,
        scores_array: '[88,73]',
        avg_score: 80.5,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 19,
        user_id: 3,
        exercises_id: 7,
        scores_array: '[88,73,91]',
        avg_score: 84,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 20,
        user_id: 3,
        exercises_id: 7,
        scores_array: '[83,77,81]',
        avg_score: 80.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      }

    ];
      for( let i = 0; i < expected.length; i++){
        assert.deepEqual(
          actual[i],
          expected[i],
          `row id=${i + 1} not the same`
        );
      }
      done();
  })
  .catch((err) => {
    done(err);
  });
});
});
