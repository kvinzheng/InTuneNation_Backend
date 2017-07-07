process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect, assert } = require('chai');

import verifyMiddleware from '../middlewares/verifications';
const server = require('../server.js');
const knex = require('../knex.js');

describe('verifyMiddleware', () => {
  const user = {
    
  }
  it('should return a 401 status code when the auth info does not match db', () => {

  });

});
