import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import path from 'path';

if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  console.error('ERROR: JWT_SECRET or MONGO_URI is missing in the environment variables');
  process.exit(1);
}

const app = express();
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));


const __dirname = path.resolve();
app.use('/assets', express.static(path.join(__dirname, 'client', 'src', 'assets')));


app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
