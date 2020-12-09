const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { passwordMatches, generateToken } = require("../helpers/auth");

const authenticate = (req, res, next) => {
  const { email, password } = req.body;
  console.log(User);
  User.findOne({ email }, (error, user) => {
    if (passwordMatches(password, user.password)) {
      res.append("access-token", generateToken(user._id));
      res.append("uid", user.email);
      res.send({
        status: "success",
        user,
      });
    } else {
      res.status(401).send({
        error: "Invalid credentials",
      });
    }
  });
};

module.exports = {
  authenticate,
  generateToken,
};
