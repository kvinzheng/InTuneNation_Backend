# InTuneNation [BackEnd] #

This is the backend repository for our InTuneNation application and is deployed at https://ppp-capstone-music.herokuapp.com/ as the root. This backend was built with the Node.js Express framework and postgres database.

## Entity Relationship Diagram
![Entity Relationship Diagram](https://image.ibb.co/ighMPk/In_Tune_Nation_ERD.jpg)

Here is exercises table's schema

``` javascript
exports.up = function (knex) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    // exercises table belongs to user's table
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    .notNullable()
    .index();
    table.string('notes_array').notNullable().defaultTo('[]');
    table.timestamps(true, true);
  });
};
```

**Description**: The ERD schema starts at the root with “users” accounts. Users are able to create “exercises” that are tied to a foreign key of a user id. Each exercise can have a multitude of “scores”, tied by foreign keys of exercises_id and user_id.

## Technologies Used

Our app is currently built entirely with Javascript, and the back-end is built with Node.js Express server. We also rely on a few other pieces of technology, including but not limited to:
* [Google-Oauth](http://passportjs.org/docs) (Google Passport 2.0 OAuth Technologies allow user to sign in through google's account)
* [Json-Web-Token](https://www.npmjs.com/package/jsonwebtoken) (Json-Web-Token allows our server to verify if the users have the web token that we assigned to them with our unique JWT key)
* [body-parser](https://www.npmjs.com/package/body-parser-json) (Parse incoming request bodies in a middleware before your handlers)
* [knex](http://knexjs.org/) (Knex.js is a SQL query builder for Postgres)
* [bcrypt](https://www.npmjs.com/package/bcrypt-as-promised) (bcrypt is a hashing algorithm which encrypt passport, it provides 'compare' and 'hash' functionalities)
* [morgan](https://www.npmjs.com/package/morgan) (morgan is a middleware function using given format and options. It allows developers to view more detail of your HTTP requests)


## To Get Started ##

1. ```npm install``` install dependencies
2. ```touch .env``` Example .env file:
3. Please note that this repo requires Google Oauth. Please go to [Google Developer Console](https://developers.google.com/identity/protocols/OAuth2) and click ``` Google API Console``` to register a new application and update the .env file with the client id and client secret. The callback URL will need to be updated here in IntuneBackEnd/config/passport.js
```javascript
//Jwt key
JWT_KEY=XXXX
//This is google key
GOOGLE_CLIENT_ID='XXXX'
GOOGLE_CLIENT_SECRET='XXXX'
//callbackURL
CALL_BACK_URL='http://localhost:8000/auth/google/callback'
// Deployed version CALL_BACK_URL=`https://ppp-capstone-music.herokuapp.com/auth/google/callback`
```
4. For running development environment locally, run command line: ```createdb ppp_dev```
5. To run all of the tests locally, run command line: ```createdb ppp_test```
6. Seed the database. run command line:```knex migrate:rollback && knex migrate:latest && knex seed:run```


## Google OAuth ##
I make an new instance of GoogleStrategy using 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', and 'CALL_BACK_URL'. You can obtain those information from your Google plus account. after Google successfully verify your information, it would give me back your profile information in an object form. Then, that is how I would display your information on the screen.

```javascript
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALL_BACK_URL,
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
  //profile is an object with your personal information. This is a callback of successful log in
}));
```

## Testing ##
We wrote tests to test routes, seeds, and migrations.
**TO Run Test** run ```npm test``` in your terminal

* [mocha](https://mochajs.org/) (Mocha is a feature-rich Javascript testing framework running on Node.js)
* [chai](http://chaijs.com/) (Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.)
* [supertest](https://www.npmjs.com/package/supertest) (SuperTest is a module that provides high-level abstraction for testing HTTP in node.js.)

## We built a middleware to verify an authenticated user
```Javascript
function middlewareVerify(req, res, next) {
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.status(401);
      res.send({ status: 401, ErrorMessage: 'Unauthorized' });
    } else {
      req.claim = payload;
      next();
    }
  });
}
```

## Routes Documentation:
Backend contains endpoint routes for user accounts, user exercises, and user scores. Token verification is required to access `/users` routes. Token is assigned upon signup and login and must be passed through the header request. All successful responses are returned in JSON format. Failed responses are returned in plain text. `:userId` , `:exId` , & `:scId` must be replaced with integers when making a backend API request.

Simple Summary of all routes
- GET /user
- POST /user/signup
- POST /user/login
- GET /users/:userId/exercises
- GET /users/:userId/exercises/:exId
- POST /users/:userId/exercises
- GET /users/:userId/exercises/:exId/scores
- GET /users/:userId/exercises/:exId/scores/:scId
- POST /users/:userId/exercises/:exId/scores

**Show all users**
`GET /user`
Response:
```
[
  {
    id: integer,
    first_name: string,
    last_name: string,
    email: string,
    profile_picture: string,
    created_at: timestamp,
    updated_at: timestamp,
  },
]
```

**User Signup**
` POST /user/signup`
Request Body:
```
{ firstName: string, lastName: string, email: string, password: string }
```
Response:
```
{
  id: integer,
  first_name: string,
  last_name: string,
  email: string,
  profilePicture: string,
  token: string
}
```

**User Login**
`POST /user/login`
Request Body:
```
{ email: string, password: string }
```
Response:
```
{
  id: integer,
  firstName: string,
  lastName: string,
  email: string,
  profilePicture: string,
  token: string
}
```

**GET All exercises that belong to a user**
`GET /users/:userId/exercises`
Request Header:
```
token: string
```
Response:
```
[
  {
    id: integer,
    user_id: integer,
    notes_array: string
    created_at: timestamp,
    updated_at: timestamp
  },
  ...
]
```

**GET Specific exercise that belongs to a user**
`GET /users/:userId/exercises/:exId`
Request Header:
```
token: string
```
Response:
```
{
  id: integer,
  user_id: integer,
  notes_array: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

**POST User exercise to database**
`POST /users/:userId/exercises`
Request Header:
```
token: string
```
Request Request Body:
```
{ notes_array: array }
```
Response:
```
{
  id: integer,
  user_id: integer,
  notes_array: string
}
```

**GET All scores that belong to an exercise**
`GET /users/:userId/exercises/:exId/scores`
Request Header:
```
token: string
```
Response:
```
[
  {
    id: integer,
    user_id: integer,
    scores_array: string,
    avg_score: float,
    created_at: timestamp,
    updated_at: timestamp
  }
]
```

**Get Specific score that belong to an exercise***
`GET /users/:userId/exercises/:exId/scores/:scId`
Request Header:
```
token: string
```
Response:
```
{
  id: integer,
  user_id: integer,
  scores_array: string,
  avg_score: float,
  created_at: timestamp,
  updated_at: timestamp
}
```

**POST Score for a specific exercise**
`POST /users/:userId/exercises/:exId/scores`
Request Header:
```
token: string
```
Request Body:
```
{ scores_array: array, avg_score: float }
```
Response:
```
{
  id: integer,
  user_id: integer,
  scores_array: string,
  avg_score: float
}
```

## Error Responses ##
```javascript
// production error handler
// no stack traces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
```

400: `Invalid Input`
401: `Unauthorized`
404: `Not Found`
500: `Internal Server Error`
