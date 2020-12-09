const router = require('express').Router();
const usersController = require('../api/controllers/users');

router.post('/', usersController.create);

module.exports = router;
