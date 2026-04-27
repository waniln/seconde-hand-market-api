import { Request, Response } from "express";

interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    }
}

const productModel = require('../models/productModel');

export const createProduct = async (req: AuthRequest, res: Response) => {
    try {
        const { categoryId, title, description, price } = req.body;
        const userId = req.user?.id;

        await productModel.createProduct(userId, categoryId, title, description, price);
        res.status(201).json({ message: '상품 등록 성공!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류'});
    }
};

export const getAllProducts = async (req: AuthRequest, res: Response) => {
    try {
        const products = await productModel.findAllProducts();
        res.json(products);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
    try {
        const productById = await productModel.findProductById(req.params.id);
        if (!productById) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.'});
        }
        res.json(productById);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버오류'});
    }
};

export const updateProudct = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, price, status } = req.body;
        const productId = req.params.id;
        const userId = req.user?.id;

        const product = await productModel.findProductById(productId);
        if (!product) {
            return res.status(404).json({ message: ' 상품을 찾을 수 없습니다.'});
        }

        if (product.user_id !== userId) {
            return res.status(403).json({ message: '본인 상품만 수정 할 수 있습니다.' });
        }

        await productModel.updateProduct(productId, title, description, price, status);
        res.json({ message: '상품 수정 성공!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류'});
    }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
    try {
        const productId = req.params.id;
        const userId = req.user?.id;

        const proudct = await productModel.findProductById(productId);
        if(!proudct) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.'});
        };

        if (proudct.user_id !== userId) {
            return res.status(403).json({ message: '본인 상품만 삭제할 수 있습니다.' });
        }

        await productModel.deleteProduct(productId);
        res.json({ message: '상품 삭제 성공!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류'});
    }
};

