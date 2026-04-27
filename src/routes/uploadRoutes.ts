import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import * as uploadContorller from '../controllers/uploadController';
import upload from '../middlewares/uploadMiddleware';

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), uploadContorller.uploadImage);

export default router;