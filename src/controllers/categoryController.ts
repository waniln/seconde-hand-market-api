import { Request, Response } from "express";

const categoryModel = require('../models/categoryModel');

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.findAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await categoryModel.createCategory(name);
    res.status(201).json({ message: '카테고리 추가 성공!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};
