const router = require('express').Router();
const meetingsController = require('../api/controllers/meetings');

router.post('/', meetingsController.create);
router.post('/:id/attendants', meetingsController.addAtendants);

module.exports = router;