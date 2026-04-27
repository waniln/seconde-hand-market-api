import express from 'express';
import * as chatController from '../controllers/chatController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/:productId', authMiddleware, chatController.createChat);
router.get('/', authMiddleware, chatController.getMyChats);
router.post('/:chatId/messages', authMiddleware, chatController.sendMessage);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);

export default router;