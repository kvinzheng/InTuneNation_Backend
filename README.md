# PPPbackend-route

Routes documentations

**---See all user information.**
`router.get('/user')`

**---User can sign up for a new account with our database with
---(firstName, lastName, email, password).**
`router.post(‘/user/signup’)`

**---User can log into their account.
---(email, password)**
`router.post(‘/user/login’)`

**---Look through specific user_id and see all past exercise instances**
`router.get(‘/users/:userId/exercises’)`

**---Look at specific user’s collection of exercises and examine a particular exercise by its exercise ID**
`router.get(‘/users/:userId/exercises/:exId’)`

**---A user can post a new exercise to the database**
`router.post(‘/users/:userId/exercises’)`

**---A user can get score combinations from a particular exercise**
`router.get(‘/users/:userId/exercises/:exId/scores’)`

**---A User can get a particular score from the score combination of a particular exercise instance.***
`router.get(‘/users/:userId/exercises/:exId/scores/:scId’)`

**---A User can post new score combinations (and average score of the new score combination) to a particular exercise type.**
`router.post(‘/users/:userId/exercises/:exId/scores’)`
