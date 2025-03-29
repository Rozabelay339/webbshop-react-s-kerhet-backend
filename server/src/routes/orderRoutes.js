// src/routes/orderRoutes.js
import express from 'express';
import Order from '../models/orderModel.js'; // Make sure this path is correct

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  const { name, address, items } = req.body;
  const newOrder = new Order({ name, address, items });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
