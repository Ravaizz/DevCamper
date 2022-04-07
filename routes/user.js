const express = require('express');
const router = express.Router();
user_controller = require('../controllers/user.controller');

router.post('/auth/signup',user_controller.signup);

module.exports = router;
