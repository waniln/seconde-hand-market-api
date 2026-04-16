const express = require('express');
const router = express.Router();
const wishController = require('../controllers/wishController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:productId', authMiddleware, wishController.toggleWish);
router.get('/', authMiddleware, wishController.getMyWishes);

module.exports = router;