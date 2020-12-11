const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const { validateToken } = require('./app/middleware/auth');
const routes = {
  users: require('./app/routes/users'),
  auth: require('./app/routes/auth'),
  meetings: require('./app/routes/meetings'),
  attendances: require('./app/routes/attendances'),
};

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/meetings', validateToken, routes.meetings);
app.use('/attendances', validateToken, routes.attendances);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
