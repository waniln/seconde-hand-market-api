const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const { productValidator } = require('../middlewares/validators');

router.post('/',authMiddleware, productValidator, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, productController.updateProudct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;