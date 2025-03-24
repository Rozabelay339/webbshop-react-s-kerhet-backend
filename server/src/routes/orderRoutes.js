import express from 'express';
import { createOrder } from '../controllers/orderController.js'; // Ensure correct path

const router = express.Router();
router.post('/orders', createOrder);

export default router;
