import express from 'express';
import * as wishController from '../controllers/wishController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/:productId', authMiddleware, wishController.toggleWish);
router.get('/', authMiddleware, wishController.getMyWishes);

export default router;