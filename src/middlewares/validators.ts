import { Request, Response, NextFunction } from "express";

const { body, validationResult } = require('express-validator');

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors  = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const registerValidator = [
    body('email').isEmail().withMessage('유효한 이메일 형식이 아닙니다.'),
    body('password').isLength({ min:6 }).withMessage('비밀번호는 최소 6자 이상이어야 합니다.'),
    body('nickname').notEmpty().withMessage('닉네임을 입력해주세요.').isLength({ min: 2, max: 20 }).withMessage('닉네임은 2자 이상 20자 이하여야 합니다.'),
    validate,
];

export const loginValidator = [
    body('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다.'),
    body('password').notEmpty().withMessage('비밀번호를 입력해주세요.'),
    validate,
];

export const productValidator = [
    body('title').notEmpty().withMessage('상품명을 입력해주세요.').isLength({ max: 100 }). withMessage('상품명은 100자 이하여야 합니다.'),
    body('price').isInt({ min: 0 }).withMessage('가격은 0원 이상이어야 합니다.'),
    validate,
];