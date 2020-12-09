const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const create = (req, res, next) => {
  const { name, email, password } = req.body;

  User.create({
    name,
    email,
    password,
  }, (error, result) => {
    if (error) 
      next(error);
    else
      res.send({
        status: 'success',
        user: {
          result,
        },
      });
  })
};

const authenticate = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, result) => {
    if (error) next(error);
    else {
      if (bcrypt.compareSync(password, result.password)) {
        const token = jwt.sign({ id: result._id }, 'temporary', { expiresIn: '1w' });
        res.send({
          status: 'success',
          user: result,
          token,
        });  
      } else {
        res.send({
          error,
        });
      };
    };
  });
};

module.exports = {
  create,
  authenticate,
}
