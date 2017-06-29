process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect, assert } = require('chai');

const server = require('../server.js');
const knex = require('../knex.js');
