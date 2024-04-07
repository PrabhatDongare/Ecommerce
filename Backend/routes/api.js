const express = require('express');
const router = express.Router();

const categoryRoute = require('./categoryRoute');
const userRoute = require('./userRoute');

router.use('/api/category', categoryRoute);
router.use('/api/auth', userRoute);


module.exports = router;