const jwt = require('jsonwebtoken');

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

module.exports = {
  middlewareVerify,
};
