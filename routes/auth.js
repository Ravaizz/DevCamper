const express = require('express');
const router = express.Router();
auth_controller = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/auth/login',auth_controller.log_in);
router.post('/auth/changepassword',protect,auth_controller.changePassword);
router.post('/auth/forgotpassword',auth_controller.Forgotpassword);
router.post('/auth/resetpassword',auth_controller.resetpassword);

module.exports = router;




