const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:productId', authMiddleware, chatController.createChat);
router.get('/', authMiddleware, chatController.getMyChats);
router.post('/:chatId/messages', authMiddleware, chatController.sendMessage);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);

module.exports = router;