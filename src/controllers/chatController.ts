import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

const chatModel = require('../models/chatModel');
const productModel = require('../models/productModel');

// 채팅방 생성 또는 기존 채팅방 반환
export const createChat = async (req:AuthRequest, res:Response) => {
  try {
    const buyerId = req.user?.id;
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
export const getMyChats = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user?.id;
    const chats = await chatModel.findMyChats(userId);
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 메시지 전송
export const sendMessage = async (req:AuthRequest, res:Response) => {
  try {
    const senderId = req.user?.id;
    const chatId = req.params.chatId;
    const { message } = req.body;

    // 채팅방 참여자 확인
    const chat = await chatModel.findChatById(chatId);
    if (!chat) {
      return res.status(404).json({ message: '채팅방을 찾을 수 없습니다.' });
    }
    if (chat.buyer_id !== senderId && chat.seller_id !== senderId) {
      return res.status(403).json({ message: '채팅방 참여자가 아닙니다.' });
    }

    await chatModel.createMessage(chatId, senderId, message);
    res.status(201).json({ message: '메시지 전송 성공!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 메시지 조회
export const getMessages = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user?.id;
    const chatId = req.params.chatId;

     // 채팅방 참여자 확인
    const chat = await chatModel.findChatById(chatId);
    if (!chat) {
      return res.status(404).json({ message: '채팅방을 찾을 수 없습니다.' });
    }
    if (chat.buyer_id !== userId && chat.seller_id !== userId) {
      return res.status(403).json({ message: '채팅방 참여자가 아닙니다.' });
    }

    const messages = await chatModel.findMessages(chatId);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};