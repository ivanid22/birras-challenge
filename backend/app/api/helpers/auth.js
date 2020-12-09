const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordMatches = (plain, encrypted) => bcrypt.compareSync(plain, encrypted);
const generateToken = id => jwt.sign({ id }, "temporary", { expiresIn: '1w' });

module.exports = {
  passwordMatches,
  generateToken,
};