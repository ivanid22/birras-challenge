const router = require('express').Router();
const meetingsController = require('../api/controllers/meetings');

router.post('/', meetingsController.create);

module.exports = router;