const productModel = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
        const { categotyId, title, description, price } = req.body;
        const userId = req.user.id;

        await productModel.createProduct(userId, categorytId, title, description. price);
        res.status(201).json({ message: '상품 등록 성공!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류'});
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.findAllProducts();
        res.json(products);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

const getProductById = async (req, res) => {
    try {
        const productById = await productModel.findProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.'});
        }
        res.json(productById);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버오류'});
    }
};

module.exports = { createProduct, getAllProducts, getProductById};