const express = require('express');
const router = express.Router();
const userConroller = require('../controllers/userController');

router.post('/register', userConroller.register);
router.post('/login', userConroller.login);

module.exports = router;