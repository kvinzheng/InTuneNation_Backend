const jwt = require('jsonwebtoken');
// console.log('did i use middleware?');

function middlewareVerify(req, res, next){
  jwt.verify(req.headers.cookie.substring(6), process.env.JWT_KEY, (err, payload) => {
    if (err) {
      // console.log('did i make an error?');
      res.status(401);
      res.send({ status: 401, ErrorMessage: 'Unauthorized' });
    }
    else{
      let tokenId = payload.userId;

      next();
    }
  });
}

module.exports = {
  middlewareVerify: middlewareVerify,
}
