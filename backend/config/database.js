const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost/birras_challenge';

mongoose.connect(DB_URL);
mongoose.Promise = global.Promise;

module.exports = mongoose;
