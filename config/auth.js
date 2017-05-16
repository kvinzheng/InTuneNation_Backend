<<<<<<< HEAD
require('dotenv').config();

module.exports = {
  'googleAuth': {
    'clientID': process.env.clientID,
    'clientSecret': process.env.clientSecret,
    'callbackURL': 'http://localhost:8000/auth/google/callback'
  }
=======
// NEVER EVER DO THIS!!!

// Never put your clientID & clientSecret in anything that ends up on github.

// place this data in your .env file. Certainly by now, someone is using this data for something. 

module.exports = {
    'googleAuth': {
        'clientID': '561032879056-f8s3lcjn3g71vvkqu5ikigfni3tefkge.apps.googleusercontent.com',
        'clientSecret': 'hSkCZxKPL09OZssxClttabXo',
        'callbackURL': 'http://localhost:8000/auth/google/callback'
    }
>>>>>>> 8837da1403c357ab626617dfe51576fcfb1daa21
}
