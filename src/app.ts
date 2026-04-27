import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import wishRoutes from './routes/wishRoutes';
import categoryRoutes from './routes/categoryRoutes';
import chatRoutes from './routes/chatRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/wishes', wishRoutes);
app.use('/categories',categoryRoutes);
app.use('/chats', chatRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.json({ message: '중고거래 API 서버 실행 중' });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

export default app;