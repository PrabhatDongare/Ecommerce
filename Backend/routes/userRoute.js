const express = require('express');
const router = express.Router();

const { userLogin, userSignUp, getUser, verifyOtp } = require('../Controller/UserController')
const { createValidator, loginValidator } = require('../utils/validation')
const fetchuser = require('../middleware/fetchuser')


router.post("/signup", createValidator, userSignUp);
router.post("/verifyOtp", verifyOtp);
router.post("/login", loginValidator, userLogin);
router.post("/getUser", fetchuser, getUser); 


module.exports = router