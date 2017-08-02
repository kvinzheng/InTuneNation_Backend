process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect, assert } = require('chai');

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
  })
})


describe('users seeds', () => {

it('users rows', (done) => {
  knex.select('id', 'first_name', 'last_name', 'email', 'profile_picture', 'created_at', 'updated_at')
  .from('users')
  .orderBy('id', 'ASC')
  .then((actual) => {
    const expected = [
      {
        id: 1,
        first_name: 'Bob',
        last_name: 'Saget',
        email: 'bobsaget@gmail.com',
        "profile_picture": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",
        created_at: new Date('2016-06-21 14:26:16 UTC'),
        updated_at: new Date('2016-06-21 14:26:16 UTC'),
      },
      {
        id: 2,
        first_name: 'Kevin',
        last_name: 'Zheng',
        email: 'kvinzheng@gmail.com',
        "profile_picture": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",
        created_at: new Date('2016-06-22 14:26:16 UTC'),
        updated_at: new Date('2016-06-22 14:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Reid',
        last_name: 'Delahunt',
        email: 'reidpierredelahunt@gmail.com',
        "profile_picture": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",
        created_at: new Date('2016-06-23 14:26:16 UTC'),
        updated_at: new Date('2016-06-23 14:26:16 UTC'),
      },
      {
        id: 4,
        first_name: 'Marty',
        last_name: 'Yee',
        email: 'martytheemartian@yahoo.com',
        "profile_picture": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",
        created_at: new Date('2016-06-24 14:26:16 UTC'),
        updated_at: new Date('2016-06-24 14:26:16 UTC'),
      }];
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
