const router = require('express').Router();
const authController = require('../api/controllers/auth');

router.post('/sign_in', authController.authenticate);

module.exports = router;
