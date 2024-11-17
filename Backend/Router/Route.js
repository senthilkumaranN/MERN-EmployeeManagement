const express = require('express')
const router = express.Router();
const {registeration,Login} = require('../Controller/userController');


router.post('/register',registeration)
router.post('/login',Login)


module.exports = router;