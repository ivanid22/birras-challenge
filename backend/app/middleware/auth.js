const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  jwt.decode(req.get('access-token'), 'temporary', (error, result) => {
    if(error) {
      res.status(401).send({ error: 'Invalid token' });
    }
    else {
      res.append('uid', result.id);
      next();
    }
  });
};

module.exports = {
  validateToken,
};
