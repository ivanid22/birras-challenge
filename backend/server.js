const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(({
    success: true,
  }));
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
