const express = require('express');
const { postCourseStat, getCourseLifetimeStats, getSingleSessionStat } = require('../controller/courseController');

const router = express.Router();

router.post('/courses/:courseId', postCourseStat);
router.get('/courses/:courseId', getCourseLifetimeStats);
router.get('/courses/:courseId/sessions/:sessionId', getSingleSessionStat);

module.exports = router;