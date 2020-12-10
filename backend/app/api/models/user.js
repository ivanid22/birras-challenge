const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UserType } = require('../types/user');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: Number,
    default: UserType.ATTENDANT,
  },
});

UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('user', UserSchema);
