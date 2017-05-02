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


describe('scores migrations', () => {
  it('testing scores migration', done => {
    knex('scores').columnInfo()
    .then((actual) => {
      const expected = {
        id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'scores_id_seq\'::regclass)'
        },

        user_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },

        exercises_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },

        scores_array: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'[]\'::character varying'
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
            `Column ${column} is not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
