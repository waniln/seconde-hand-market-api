import { Request, Response } from "express";

interface MulterRequrest extends Request {
    file?: Express.Multer.File;
}

const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');
const{ v4: uuidv4 } = require('uuid');

export const uploadImage = async (req:MulterRequrest, res:Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: '이미지 파일이 없습니다.' });
        }

        const fileExtension = req.file.originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        });

        await s3.send(command);

        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        res.status(201).json({ message: '이미지 업로드 성공!', imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    } 
};
