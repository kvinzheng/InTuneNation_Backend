const jwt = require('jsonwebtoken');
// console.log('did i use middleware?');

function middlewareVerify(req, res, next){
  // console.log('what is req.headers now kevin?', req.headers);
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      // console.log('did i make an error?');
      res.status(401);
      res.send({ status: 401, ErrorMessage: 'Unauthorized' });
    }
    else{
      let tokenId = payload.userId;
      req.claim = payload;
      next();
    }
  });
}

module.exports = {
  middlewareVerify: middlewareVerify,
}
