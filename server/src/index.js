// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'; // Correct import
import authRoutes from './routes/authRoutes.js'; // Correct import
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
