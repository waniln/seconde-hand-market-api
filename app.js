const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3000;
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const wishRoutes = require('./src/routes/wishRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/wishes', wishRoutes);
app.use('/categories', categoryRoutes);
app.use('/chats', chatRoutes);

app.get('/', (req, res) => {
    res.json({ message: '중고거래 API 서버 실행 중' });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

module.exports = app;