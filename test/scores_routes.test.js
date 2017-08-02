process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const server = require('../server.js');
const knex = require('../knex.js');


describe('GET /users/:userId/exercises/:exId/scores', () => {

  it('responds with 200 & JSON', done => {
    request(server)
    .get('/users/1/exercises/6/scores')
    .set({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5ODYxNDIxOCwiZXhwIjoxNDk5MjE5MDE4fQ.zaKKd3vNk_lYTtlH_lEy04mvRm9LejuWBQJGj7B8xY0"})
    .expect('Content-type', /json/)
    .expect(200, done);
  });

  it('requests an array of all scores of a user exercise', done => {
    request(server)
    .get('/users/1/exercises/6/scores')
    .set({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5ODYxNDIxOCwiZXhwIjoxNDk5MjE5MDE4fQ.zaKKd3vNk_lYTtlH_lEy04mvRm9LejuWBQJGj7B8xY0"})
    .end( (err, res ) => {
      expect(res.body).to.deep.equal([
        {
          id: 10,
          user_id: 1,
          exercises_id: 6,
          scores_array: '[88,82,78]',
          avg_score: 82.67,
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        },
        {
          id: 11,
          user_id: 1,
          exercises_id: 6,
          scores_array: '[91,83,86]',
          avg_score: 86.67,
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        },
        {
          id: 12,
          user_id: 1,
          exercises_id: 6,
          scores_array: '[79,87,78]',
          avg_score: 81.33,
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        },
        {
          id: 13,
          user_id: 1,
          exercises_id: 6,
          scores_array: '[68,82,73]',
          avg_score: 74.33,
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        }

      ]);
      done();
    });
  });
});

describe('GET /users/:userId/exercises/:exId/scores/:scId', () => {

  it('responds with 200 & JSON', done => {
    request(server)
    .get('/users/1/exercises/6/scores/12')
    .set({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5ODYxNDIxOCwiZXhwIjoxNDk5MjE5MDE4fQ.zaKKd3vNk_lYTtlH_lEy04mvRm9LejuWBQJGj7B8xY0"})
    .expect('Content-type', /json/)
    .expect(200, done);
  });

  it('requests a specific user exercise score', done => {
    request(server)
    .get('/users/1/exercises/6/scores/12')
    .set({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5ODYxNDIxOCwiZXhwIjoxNDk5MjE5MDE4fQ.zaKKd3vNk_lYTtlH_lEy04mvRm9LejuWBQJGj7B8xY0"})
    .end( (err, res ) => {
      expect(res.body).to.deep.equal(
        {
          id: 12,
          user_id: 1,
          exercises_id: 6,
          scores_array: '[79,87,78]',
          avg_score: 81.33,
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        });
      done();
    });
  });
});

describe('POST /users/:userId/exercises/:exId/scores', () => {

  const newScores = {
    id: 21,
    user_id: 1,
    exercises_id: 6,
    scores_array: [85,87,82],
    avg_score: 84.67
  };

  const response = {
    id: 21,
    user_id: 1,
    exercises_id: 6,
    scores_array: '[85,87,82]',
    avg_score: 84.67
  };

  it('should return confirmation object plus 200 & JSON', done => {
    request(server)
      .post('/users/1/exercises/6/scores')
      .set({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5ODYxNDIxOCwiZXhwIjoxNDk5MjE5MDE4fQ.zaKKd3vNk_lYTtlH_lEy04mvRm9LejuWBQJGj7B8xY0"})
      .send(newScores)
      .expect(response)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('verifies that new entry has been inserted to database', done => {
      request(server)
      .post('/users/1/exercises/6/scores')
      .set({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5ODYxNDIxOCwiZXhwIjoxNDk5MjE5MDE4fQ.zaKKd3vNk_lYTtlH_lEy04mvRm9LejuWBQJGj7B8xY0"})
      .send(newScores)
      .end((err, res) => {
        knex('scores')
        .select('id', 'user_id', 'exercises_id', 'scores_array', 'avg_score')
        .then(scores => {
          expect(scores).to.have.lengthOf(scores.length);
          expect(scores).to.deep.include(response);
          done();
        });
      });
    });

});
