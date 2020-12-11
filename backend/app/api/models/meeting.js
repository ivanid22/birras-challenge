const mongoose = require('mongoose');
const { UserType } = require('../types/user');

const { Schema } = mongoose;

const MeetingSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  attendants: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    unique: true,
  }],
});

MeetingSchema.methods.numberOfAttendants = function() {
  return this.attendants.length;
};

// Make sure creator is an admin
MeetingSchema.pre('save', function(next) {
  if (this.creator.type !== UserType.ADMIN) {
    console.log('type', this.creator.type)
    const error = new Error('Only admins can create meetings');
    next(error);
  } else {
    next();
  }
});

module.exports = mongoose.model('meeting', MeetingSchema);
