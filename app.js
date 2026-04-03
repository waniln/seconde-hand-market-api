const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: '중고거래 API 서버 실행 중' });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

module.exports = app;