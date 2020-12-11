const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;

console.log(process.env);


mongoose.connect(MONGODB_URL);
mongoose.Promise = global.Promise;

module.exports = mongoose;
