const db = require('../config/db');

const findAllCategories = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

const createCategory = async (name) => {
  const [result] = await db.query(
    'INSERT INTO categories (name) VALUES (?)',
    [name]
  );
  return result;
};

module.exports = { findAllCategories, createCategory };