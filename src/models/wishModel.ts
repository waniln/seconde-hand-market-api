const db = require('../config/db');

// 찜하기
export const createWish = async (userId: number, productId: number) => {
  const [result] = await db.query(
    'INSERT INTO wishes (user_id, products_id) VALUES (?, ?)',
    [userId, productId]
  );
  return result;
};

// 찜 취소
export const deleteWish = async (userId: number, productId: number) => {
  const [result] = await db.query(
    'DELETE FROM wishes WHERE user_id = ? AND products_id = ?',
    [userId, productId]
  );
  return result;
};

// 찜 여부 확인
export const findWish = async (userId: number, productId: number) => {
  const [rows] = await db.query(
    'SELECT * FROM wishes WHERE user_id = ? AND products_id = ?',
    [userId, productId]
  );
  return rows[0];
};

// 내 찜 목록
export const findAllWishes = async (userId: number) => {
  const [rows] = await db.query(
    'SELECT * FROM wishes WHERE user_id = ?',
    [userId]
  );
  return rows;
};
