const express = require('express');
const mongoose = require('mongoose');
const { protect } = require('../middleware/auth');
const router = express.Router();
const bootcamp_controller = require('../controllers/bootcamp.controller');
const getcourse = require('../routes/course');
const advancedQuery = require('../middleware/advancedQuery');
const Bootcamp = require('../models/bootcamp.model');

router.post('/',protect,bootcamp_controller.create);
router.get('/',advancedQuery(Bootcamp),protect,  bootcamp_controller.read_all);
router.get('/:id',protect,bootcamp_controller.read);
router.put('/:id',protect,bootcamp_controller.update);
router.delete('/:id',protect,bootcamp_controller.delete);


router.use('/:id/courses',protect,getcourse);

module.exports = router;
