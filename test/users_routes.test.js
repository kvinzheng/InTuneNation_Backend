process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const server = require('../server.js');
const knex = require('../knex.js');

const account = {
  email: 'bobsaget@gmail.com',
  password: 'youreawizard'
};
let token = null;

before(done => {
  knex.migrate.latest().then(() => {
    return knex.seed.run()
  }).then(() => {
    request(server).post('/user/login').send(account).end((err, res) => {
      token = res.body.token;
    });
    done();
  }).catch((err) => {
    done(err);
  });
});

after((done) => {
  knex.migrate.rollback().then(() => {
    done();
  });
});

describe('GET /user', () => {

  it('responds with 200 & JSON', done => {
    request(server).get('/user').expect('Content-type', /json/).expect(200, done);
  });

  it('requests an array of all users when responding with JSON', done => {
    request(server).get('/user').end((err, res) => {
      expect(res.body.map((ele) => {
        delete ele.profile_picture;
        return ele;
      })).to.deep.equal([
        {
          id: 1,
          first_name: 'Bob',
          last_name: 'Saget',
          email: 'bobsaget@gmail.com'
        }, {
          id: 2,
          first_name: 'Kevin',
          last_name: 'Zheng',
          email: 'kvinzheng@gmail.com'
        }, {
          id: 3,
          first_name: 'Reid',
          last_name: 'Delahunt',
          email: 'reidpierredelahunt@gmail.com'
        }, {
          id: 4,
          first_name: 'Marty',
          last_name: 'Yee',
          email: 'martytheemartian@yahoo.com'
        }, {
          id: 5,
          first_name: 'Michael',
          last_name: 'Martinez',
          email: 'martinez1212@gmail.com'
        }, {
          id: 6,
          first_name: 'Ryan',
          last_name: 'Thissen',
          email: 'rmt1855@gmail.com'
        }, {
          id: 7,
          first_name: 'Alexander',
          last_name: 'KKrawiec',
          email: 'alexanderkrawiec@gmail.com',
        }, {
          id: 8,
          first_name: "parker",
          last_name: "lewis",
          email: "parklewis@gmail.com",
        }
      ]);
      done();
    });
  });
});

describe('POST /user/login', () => {
  const logInUser = {
    email: 'parklewis@gmail.com',
    password: '12345678910',
  };

  const expectedUser = {
    id: 8,
    firstName: 'parker',
    lastName: 'lewis',
    email: 'parklewis@gmail.com',
  };

  it('adds the user is in the data base as well', done => {
    request(server).post('/user/login').send(logInUser)
    .end((err, res) => {
      knex('users').select('first_name', 'last_name', 'email')
      .then((users) => {
        expect(users).to.deep.include({ first_name: 'parker', last_name: 'lewis', email: 'parklewis@gmail.com' });
        done();
      });
    });
  });
});

describe('POST /user/signup', () => {
  const newUser = {
    firstName: 'Matt',
    lastName: 'Murr',
    password: '123456password',
    email: 'mattmurr@gmail.com',
  };

  const expectedUser = {
    id: 9,
    firstName: 'Matt',
    lastName: 'Murr',
    email: 'mattmurr@gmail.com',
    profilePicture: "",
  };

  it('sucessfully creates a new user', done => {
    request(server).post('/user/signup').send(newUser).expect((res) => {
      delete res.body.token;
    })
    .expect('Content-Type', /json/)
    .expect(200, done).expect(expectedUser);
  });

  it('adds the newUser to the database', done => {
    request(server).post('/user/signup')
    .send(newUser).end((err, res) => {
      knex('users').select('id', 'first_name', 'last_name', 'email')
      .then((users) => {
        expect(users).to.have.lengthOf(users.length);
        expect(users).to.deep.include({ id: 9, first_name: 'Matt', last_name: 'Murr', email: 'mattmurr@gmail.com' });
        done();
      });
    });
  });
});
