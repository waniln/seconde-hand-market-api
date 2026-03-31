const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/config/db');


dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3000;

db.query('SELECT 1')
  .then(() => console.log('DB 연결 성공!'))
  .catch((err) => console.error('DB 연결 실패:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: '중고거래 API 서버 실행 중' });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

module.exports = app;