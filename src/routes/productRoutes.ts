import express from 'express';
import * as productController from'../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';
import { productValidator } from '../middlewares/validators' ;

const router = express.Router();

router.post('/',authMiddleware, productValidator, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, productController.updateProudct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;