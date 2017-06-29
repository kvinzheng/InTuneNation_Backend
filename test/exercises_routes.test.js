process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const server = require('../server.js');
const knex = require('../knex.js');


beforeEach( done => {
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


describe('GET /users/:userId/exercises', () => {

  it('responds with 200 & JSON', done => {
    request(server)
    .get('/users/1/exercises')
    .expect('Content-type', /json/)
    .expect(200, done);
  });

  it('requests an array of all exercises of a user', done => {
    request(server)
    .get('/users/4/exercises')
    .end( (err, res ) => {
      expect(res.body).to.deep.equal([
        {
          id: 19,
          user_id: 4,
          notes_array: '[44,47,42]',
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        },
        {
          id: 20,
          user_id: 4,
          notes_array: '[36,35,37]',
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        },

      ]);
      done();
    });
  });
});

describe('GET /users/:userId/exercises/:exId', () => {

  it('responds with 200 & JSON', done => {
    request(server)
    .get('/users/2/exercises/3')
    .expect('Content-type', /json/)
    .expect(200, done);
  });

  it('requests a specific user exercise', done => {
    request(server)
    .get('/users/2/exercises/3')
    .end( (err, res ) => {
      expect(res.body).to.deep.equal(
        {
          id: 3,
          user_id: 2,
          notes_array: '[40,42,44,40,42]',
          created_at: "2016-06-29T14:26:16.000Z",
          updated_at: "2016-06-29T14:26:16.000Z",
        });
      done();
    });
  });
});

describe('POST /users/:userId/exercises', () => {

  const exercise = {
    id: 21,
    user_id: 2,
    notes_array: [35,36,38,42]
  };

  const response = {
    id: 21,
    user_id: 2,
    notes_array: '[35,36,38,42]'
  };

  it('should give a users account a new exercise instance before they hit sing', done => {
    request(server)
    .post('/users/2/exercises')
    .send(exercise)
    .expect(response)
    .expect((res) => {
      delete res.body.created_at;
      delete res.body.updated_at;
    })
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('should verify that the new entry is now inside the database', done => {
    request(server)
      .post('/users/2/exercises')
      .send(exercise)
      .end((err, res) => {
        knex('exercises')
        .select('id', 'user_id', 'notes_array')
        .where('user_id', exercise.user_id)
        .orderBy('id', 'desc')
        .then(result => {
          expect(result[0]).to.deep.equal(response);
          done();
        });
      });
    });

});
