const express = require('express');
const router = express.Router();
const { getMyAssignments, completeAssignment } = require('../controllers/assignmentController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyAssignments);
router.post('/:id/complete', protect, completeAssignment);

module.exports = router;
