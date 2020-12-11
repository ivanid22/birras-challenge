const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  console.log('validating');
  const token = req.get('access-token');
  console.log(token);
  if (!token) res.status(401).send({ error: 'No access token provided' });
  jwt.verify(req.get('access-token'), process.env.JWT_SECRET, (error, result) => {
    console.log('eval')
    if(error) {
      console.log('failed')
      res.status(401).send({ error: 'Invalid token' });
    }
    else {
      console.log('result', result);
      req.body.uid = result.id;
      next();
    }
  });
};

module.exports = {
  validateToken,
};
