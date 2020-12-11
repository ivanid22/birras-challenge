const UserType = {
  ADMIN: 1,
  ATTENDANT: 2,
};

const UserShapes = {
  publicFields: {
    email: 1,
    name: 1,
    _id: 1,
  },
};

module.exports = {
  UserType,
  UserShapes,
};
