const wishModel = require('../models/wishModel');

const toggleWish = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const wish = await wishModel.findWish(userId, productId);

        if (wish) {
            await wishModel.deleteWish(userId, productId);
            res.json({ message: '찜 취소!'});
        } else {
            await wishModel.createWish(userId, productId);
            res.json({ message: '찜 등록!'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류'});
    }
};

const getMyWishes = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishes = await wishModel.findAllWishes(userId);
        res.json(wishes);    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류'});
    }
};

module.exports = { toggleWish, getMyWishes };