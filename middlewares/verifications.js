const jwt = require('jsonwebtoken');
// console.log('did i use middleware?');

function middlewareVerify(req, res, next){
  // console.log("what is cookie?", req.headers);
  jwt.verify(req.headers.cookie.substring(5), process.env.JWT_KEY, (err, payload) => {
    if (err) {
      // console.log('did i make an error?');
      res.status(401);
      res.send({ status: 401, ErrorMessage: 'Unauthorized' });
    }
    else{
      tokenId = payload.userId;
      next();
    }
  });
}

module.exports = {
  middlewareVerify: middlewareVerify,
}
