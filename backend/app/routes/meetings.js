const router = require('express').Router();
const meetingsController = require('../api/controllers/meetings');

router.post('/', meetingsController.create);
router.post('/:id/attendants', meetingsController.addAtendants);
router.get('/:id', meetingsController.getMeeting);
router.get('/', meetingsController.getMeetings);

module.exports = router;