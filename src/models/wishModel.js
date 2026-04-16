const db = require('../config/db');

// 찜하기
const createWish = async (userId, productId) => {
  const [result] = await db.query(
    'INSERT INTO wishes (user_id, products_id) VALUES (?, ?)',
    [userId, productId]
  );
  return result;
};

// 찜 취소
const deleteWish = async (userId, productId) => {
  const [result] = await db.query(
    'DELETE FROM wishes WHERE user_id = ? AND products_id = ?',
    [userId, productId]
  );
  return result;
};

// 찜 여부 확인
const findWish = async (userId, productId) => {
  const [rows] = await db.query(
    'SELECT * FROM wishes WHERE user_id = ? AND products_id = ?',
    [userId, productId]
  );
  return rows[0];
};

// 내 찜 목록
const findAllWishes = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM wishes WHERE user_id = ?',
    [userId]
  );
  return rows;
};

module.exports = { createWish, deleteWish, findWish, findAllWishes };