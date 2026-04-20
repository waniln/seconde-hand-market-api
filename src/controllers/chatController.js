const chatModel = require('../models/chatModel');
const productModel = require('../models/productModel');

// 채팅방 생성 또는 기존 채팅방 반환
const createChat = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const productId = req.params.productId;

    // 상품 확인
    const product = await productModel.findProductById(productId);
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    // 본인 상품에는 채팅 불가
    if (product.user_id === buyerId) {
      return res.status(400).json({ message: '본인 상품에는 채팅할 수 없습니다.' });
    }

    // 이미 채팅방이 있으면 기존 채팅방 반환
    const existingChat = await chatModel.findChat(productId, buyerId);
    if (existingChat) {
      return res.json(existingChat);
    }

    // 채팅방 생성
    const result = await chatModel.createChat(productId, buyerId, product.user_id);
    res.status(201).json({ message: '채팅방 생성 성공!', chatId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 내 채팅방 목록
const getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await chatModel.findMyChats(userId);
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 메시지 전송
const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const chatId = req.params.chatId;
    const { message } = req.body;

    await chatModel.createMessage(chatId, senderId, message);
    res.status(201).json({ message: '메시지 전송 성공!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 메시지 조회
const getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await chatModel.findMessages(chatId);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

module.exports = { createChat, getMyChats, sendMessage, getMessages };