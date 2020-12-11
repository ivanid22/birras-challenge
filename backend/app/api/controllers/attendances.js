const Attendance = require('../models/attendance');
const Meeting = require('../models/meeting');

const getAttendancesForMeeting = async (req, res) => {
  const meetingId = req.params.id;

  try {
    const attendances = await Attendance.find({
      meeting: meetingId,
    }, { user: 1 }); 
    res.send(attendances);
  } catch(error) {
    res.status(404).send({ error: error.message });
  };
};

const createAttendance = async (req, res) => {
  const { userId, meetingId } = req.body;
  try {
    const attendance = await Attendance.create({
      user: userId,
      meeting: meetingId,
    });

    res.send({
      status: 'success',
      attendance,
    });
  } catch(error) {
    res.status(422).send({ error: error.message });
  };
};

module.exports = {
  getAttendancesForMeeting,
  createAttendance,
}

