const express = require('express');
const router = express.Router({mergeParams:true});
const bootcamp = require('../models/bootcamp.model');
const course_controller = require('../controllers/course.controller');
const Course = require('../models/course.model');
const advancedQuery = require('../middleware/advancedQuery');


router.post('/',course_controller.create);
router.get('/',advancedQuery(Course,'bootcamp'),course_controller.read_all);
router.get('/:courseid',course_controller.read);
router.put('/:courseid',course_controller.update);
router.delete('/:courseid',course_controller.delete);

module.exports = router;


