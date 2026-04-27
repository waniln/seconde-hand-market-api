const db = require('../config/db');

export const findAllCategories = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

export const createCategory = async (name: string) => {
  const [result] = await db.query(
    'INSERT INTO categories (name) VALUES (?)',
    [name]
  );
  return result;
};
