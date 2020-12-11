const router = require('express').Router();
const attendancesController = require('../api/controllers/attendances');

router.post('/', attendancesController.createAttendance);
router.get('/meeting/:id', attendancesController.getAttendancesForMeeting);

module.exports = router;
