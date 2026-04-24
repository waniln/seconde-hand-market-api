const express = require('express');
const router = express.Router();
const uploadContorller = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/', authMiddleware, upload.single('image'), uploadContorller.uploadImage);

module.exports = router;