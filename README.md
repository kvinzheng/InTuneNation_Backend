# Invervalicity [Backend]

This is the backend repository for our Intervalicity application and is deployed at https://ppp-capstone-music.herokuapp.com/ as the root.

Backend contains endpoint routes for user accounts, user exercises, and user scores. Token verification is required to access `/users` routes. Token is assigned upon signup and login and must be passed through the header request. All successful responses are returned in JSON format. Failed responses are returned in plain text. `:userId` , `:exId` , & `:scId` must be replaced with integers when making a backend API request.

## Entity Relationship Diagram
![Entity Relationship Diagram](https://image.ibb.co/ighMPk/In_Tune_Nation_ERD.jpg)

## Technologies Used

Our app is currently built entirely with Javascript, and the back-end is built with Node.js Express server. We also rely on a few other pieces of technology, including but not limited to:
* [Google-Oauth](http://passportjs.org/docs) (Google Passport 2.0 OAuth Technologies allow user to sign in through google's account)
* [Json-Web-Token](https://www.npmjs.com/package/jsonwebtoken) (Json-Web-Token allows our server to verify if the users have the web token that we assigned to them with our unique JWT key)
* [body-parser](https://www.npmjs.com/package/body-parser)(Parse incoming request bodies in a middleware before your handlers)
* [knex](http://knexjs.org/) (http://knexjs.org/)(Knex.js is a SQL query builder for Postgres)


## Routes Documentation:

**Show all users**

`GET /user`

Response:
```
[
  {
    id: [integer],
    first_name: [string],
    last_name: [string],
    email: [string],
    created_at: [timestamp],
    updated_at: [timestamp]
  }
]
```

**User Signup**

` POST /user/signup`

Body:
```
{
  first_name: [string],
  last_name: [string],
  email: [string],
  password: [string]
}
```
Response:
```
{
  id: [integer],
  first_name: [string],
  last_name: [string],
  email: [string],
  created_at: [timestamp],
  updated_at: [timestamp]
}
```

**User Login**

`POST /user/login`

Body:
```
{
  email: [string],
  password: [string]
}
```

Response:
```
{
  id: [integer],
  first_name: [string],
  last_name: [string],
  email: [string],
  created_at: [timestamp],
  updated_at: [timestamp]
}
```

**GET All exercises that belong to a user**

`GET /users/:userId/exercises`

Response:
```
[
  {
    id: [integer],
    user_id: [integer],
    notes_array: [string]
    created_at: [timestamp],
    updated_at: [timestamp]
  }
]
```

**GET Specific exercise that belongs to a user**

`GET /users/:userId/exercises/:exId`

Response:
```
{
  id: [integer],
  user_id: [integer],
  notes_array: [string]
  created_at: [timestamp],
  updated_at: [timestamp]
}
```

**POST User exercise to database**

`POST /users/:userId/exercises`

Body:
```
{
  notes_array: [array]
}
```

Response:
```
{
  id: [integer],
  user_id: [integer],
  notes_array: [string]
}
```

**GET All scores that belong to an exercise**

`GET /users/:userId/exercises/:exId/scores`

Response:
```
[
  {
    id: [integer],
    user_id: [integer],
    scores_array: [string],
    avg_score: [float],
    created_at: [timestamp],
    updated_at: [timestamp]
  }
]
```

**Get Specific score that belong to an exercise***

`GET /users/:userId/exercises/:exId/scores/:scId`

Response:
```
{
  id: [integer],
  user_id: [integer],
  scores_array: [string],
  avg_score: [float],
  created_at: [timestamp],
  updated_at: [timestamp]
}
```

**POST Score for a specific exercise**

`router.post(‘/users/:userId/exercises/:exId/scores’)`

Body:
```
{
  scores_array: [array],
  avg_score: [float]
}
```

Response:
```
{
  id: [integer],
  user_id: [integer],
  scores_array: [string],
  avg_score: [float]
}
```

**Error Responses**

400: `Invalid Input`

404: `Not Found`
