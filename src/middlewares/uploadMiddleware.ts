import { FileFilterCallback } from "multer";

export const multer = require('multer');

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 5 * 1024 *1024,
    },
    fileFilter: (req:Request, file: Express.Multer.File, cb:FileFilterCallback) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }else {
            cb(new Error('이미지 파일만 업로드 가능합니다.'));
        }
    },
});

export default upload;