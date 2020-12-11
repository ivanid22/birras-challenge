const mongoose = require('mongoose');
const meeting = require('../models/meeting');
const Meeting = require('../models/meeting');

const { Schema } = mongoose;

const AttendanceSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  meeting: {
    type: Schema.Types.ObjectId,
    ref: 'meeting',
  },
  attended: {
    type: Boolean,
    default: false,
  },
});

AttendanceSchema.pre('save', function(next) {
  Attendance.find({
    user: this.user._id,
    meeting: this.meeting._id,
  }, (error, result) => {
    const exists = ( result.length > 0 );
    if (!exists) next() // Attendance does not exist
    else {
      console.log("else")
      const err = new Error('Attendance entry for that user and meeting already exists.');
      next(err);
    };
  });
});

AttendanceSchema.post('save', function(doc, next) {
  Meeting.findById(this.meeting._id, (error, result) => {
    console.log('result', result);
    console.log('error', error);
    console.log(this)
    if (error) {
      const err = new Error(error.message);
      next(err);
    } else {
      result.updateOne({
        attendants: [
          ...result.attendants,
          this.user,
        ],
      }, () => {
        next();
      });
    };
  });
});

const Attendance = mongoose.model('attendance', AttendanceSchema);

module.exports = Attendance;
