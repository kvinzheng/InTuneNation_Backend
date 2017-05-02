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
  knex('users').orderBy('id', 'ASC')
  .then((actual) => {
    const expected = [
      {
        id: 1,
        first_name: 'Bob',
        last_name: 'Saget',
        email: 'bobsaget@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud8ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        first_name: 'Kevin',
        last_name: 'Zheng',
        email: 'kvinzheng@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud3ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Reid',
        last_name: 'Delahunt',
        email: 'reidpierredelahunt@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud5ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 4,
        first_name: 'Marty',
        last_name: 'Yee',
        email: 'martytheemartian@yahoo.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
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
