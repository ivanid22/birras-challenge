const mongoose = require('mongoose');
const Meeting = require('../models/meeting');
const User = require('../models/user');

const create = async (req, res) => {
  const { date, uid } = req.body;
  console.log('uid', uid)
  try {
    const user = await User.findById(uid);
    const meeting = await Meeting.create({
      creator: user,
      date,
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

module.exports = {
  create,
  addAtendants,
};
