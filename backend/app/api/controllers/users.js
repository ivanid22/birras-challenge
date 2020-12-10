const User = require('../models/user');
const { generateToken } = require('../helpers/auth');

const create = (req, res, next) => {
  const { name, email, password, type } = req.body;

  User.create({
    name,
    email,
    password,
    type,
  }, (error, user) => {
    if (error)
      next(error);
    else {
      res.append('access-token', generateToken(user._id));
      res.append('uid', user.email);
      res.send({
        status: 'success',
        user,
      });
    };
  });
};

module.exports = {
  create,
}
