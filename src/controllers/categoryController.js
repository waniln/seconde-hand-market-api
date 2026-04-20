const categoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.findAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await categoryModel.createCategory(name);
    res.status(201).json({ message: '카테고리 추가 성공!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

module.exports = { getAllCategories, createCategory };