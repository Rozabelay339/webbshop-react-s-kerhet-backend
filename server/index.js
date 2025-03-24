const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
