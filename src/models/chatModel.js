const db = require('../config/db');

const createChat = async (productId, buyerId, sellerId) => {
  const [result] = await db.query(
    'INSERT INTO chats (products_id, buyer_id, seller_id) VALUES (?, ?, ?)',
    [productId, buyerId, sellerId]
  );
  return result;
};

const findChat = async (productId, buyerId) => {
  const [rows] = await db.query(
    'SELECT * FROM chats WHERE products_id = ? AND buyer_id = ?',
    [productId, buyerId]
  );
  return rows[0];
};

const findMyChats = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM chats WHERE buyer_id = ? OR seller_id = ?',
    [userId, userId]
  );
  return rows;
};

const createMessage = async (chatId, senderId, message) => {
  const [result] = await db.query(
    'INSERT INTO chat_messages (chat_id, sender_id, message) VALUES (?, ?, ?)',
    [chatId, senderId, message]
  );
  return result;
};


const findMessages = async (chatId) => {
  const [rows] = await db.query(
    'SELECT * FROM chat_messages WHERE chat_id = ? ORDER BY created_at ASC',
    [chatId]
  );
  return rows;
};

module.exports = { createChat, findChat, findMyChats, createMessage, findMessages };