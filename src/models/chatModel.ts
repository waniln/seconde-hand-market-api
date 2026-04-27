const db = require('../config/db');

export const createChat = async (productId:number, buyerId:number, sellerId:number) => {
  const [result] = await db.query(
    'INSERT INTO chats (products_id, buyer_id, seller_id) VALUES (?, ?, ?)',
    [productId, buyerId, sellerId]
  );
  return result;
};

export const findChat = async (productId:number, buyerId:number) => {
  const [rows] = await db.query(
    'SELECT * FROM chats WHERE products_id = ? AND buyer_id = ?',
    [productId, buyerId]
  );
  return rows[0];
};

export const findMyChats = async (userId:number) => {
  const [rows] = await db.query(
    'SELECT * FROM chats WHERE buyer_id = ? OR seller_id = ?',
    [userId, userId]
  );
  return rows;
};

export const createMessage = async (chatId:number, senderId:number, message:string) => {
  const [result] = await db.query(
    'INSERT INTO chat_messages (chat_id, sender_id, message) VALUES (?, ?, ?)',
    [chatId, senderId, message]
  );
  return result;
};


export const findMessages = async (chatId:number) => {
  const [rows] = await db.query(
    'SELECT * FROM chat_messages WHERE chat_id = ? ORDER BY created_at ASC',
    [chatId]
  );
  return rows;
};

export const findChatById = async (chatId:number) => {
  const [rows] = await db.query(
    'SELECT * FROM chats WHERE id = ?',
    [chatId]
  );
  return rows[0];
};
