const express = require('express');
const router = express.Router();
const { getCourses, getCourseBySlug } = require('../controllers/courseController');

router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);

module.exports = router;
