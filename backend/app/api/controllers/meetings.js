const mongoose = require('mongoose');
const Meeting = require('../models/meeting');
const User = require('../models/user');
const { UserShapes } = require('../types/user');
const { MeetingShapes } = require('../types/meeting');

const create = async (req, res) => {
  const { date, uid, title } = req.body;
  console.log('uid', uid)
  try {
    const user = await User.findById(uid);
    const meeting = await Meeting.create({
      creator: user,
      date,
      title,
    });
    res.send({
      status: 'success',
      meeting,
    });
  }
  catch (error) {
    console.log(error);
    res.status(422).send({ error: error.message });
  };
}

const addAtendants = async (req, res) => {
  const userIds = req.body.users;
  try {
    const meeting = await Meeting.findById(req.params.id);
    userIds.forEach(user => {
      if(!meeting.attendants.includes(user))
        meeting.attendants = [...meeting.attendants, user];
    })
    await meeting.updateOne({
      attendants: meeting.attendants,
    });
    res.send({
      status: 'success',
      meeting,
    });
  } catch(error) {
    res.status(422).send({ error: error.message });
  };
}

const getMeeting = async (req, res) => {
  const meetingId = req.params.id;
  console.log(meetingId)
  try {
    const meeting = await Meeting.findById(meetingId);
    const attendants = await User.find({
      _id: { $in: meeting.attendants }
    }, UserShapes.publicFields);
    res.send({
      id: meeting._id,
      date: meeting.date,
      attendants,
    });
  } catch(error) {
    res.status(422).send({ error: error.message });
  };
};

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({}, MeetingShapes.publicFields);
    res.send(meetings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

module.exports = {
  create,
  addAtendants,
  getMeeting,
  getMeetings,
};
