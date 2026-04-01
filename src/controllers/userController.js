const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
    try{
        const { email, password, nickname } = req.body;

        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: '이미 사용중인 이메일입니다.'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.createUser(email, hashedPassword, nickname);

        res.status(201).json({ message: '회원가입 성공!' });
    } catch {err} {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await userModel.findByEmail(email);
        if(!user) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
        }
    
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ message: '로그인 성공!', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { register, login };