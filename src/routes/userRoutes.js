const express = require('express');
const router = express.Router();
const userConroller = require('../controllers/userController');
const { registerValidator, loginValidator } = require('../middlewares/validators');

router.post('/register', registerValidator, userConroller.register);
router.post('/login', loginValidator, userConroller.login);

module.exports = router;