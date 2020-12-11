const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordMatches = (plain, encrypted) => bcrypt.compareSync(plain, encrypted);

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1w' });

module.exports = {
  passwordMatches,
  generateToken,
};
