process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect, assert } = require('chai');
const knex = require('../knex');

beforeEach( done => {
  knex.migrate.latest()
  .then(() => {
      done();
    })
  .catch((err) => {
    done(err);
  });
});

afterEach( done => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});


describe('users migrations', () => {
  it('testing user migration', done => {
    knex('users').columnInfo()
    .then((actual) => {
      const expected = {
        id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'users_id_seq\'::regclass)'
        },

        first_name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        last_name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        email: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: null
        },

        hashed_password: {
          type: 'character',
          maxLength: 60,
          nullable: false,
          defaultValue: null
        },

        created_at: {
          type: 'timestamp with time zone',
          maxLength: null,
          nullable: false,
          defaultValue: 'now()'
        },

        updated_at: {
          type: 'timestamp with time zone',
          maxLength: null,
          nullable: false,
          defaultValue: 'now()'
        }
      };

        for(const column in expected) {
          // expect(actual[column].to.equal(expected[column]));
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        }
      done();
    })
      .catch((err) => {
        done(err);
      });
  });
});
