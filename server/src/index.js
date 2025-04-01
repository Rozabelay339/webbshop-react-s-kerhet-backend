import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Check for essential environment variables
if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  console.error('ERROR: JWT_SECRET or MONGO_URI is missing in the environment variables');
  process.exit(1);
}

app.use(express.json()); // Parse incoming JSON requests

// CORS Configuration (Allow all origins for testing)
const corsOptions = {
  origin: '*',  // Allow all origins (for testing)
  methods: 'GET,POST,DELETE',
};
app.use(cors(corsOptions));

// Mount routes under '/api'
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database', err);
});
