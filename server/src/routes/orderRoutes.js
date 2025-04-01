import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrdersByUserName,
  getOrderById,
  deleteAllOrders,
  deleteOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);            // Create order
router.get('/', getAllOrders);            // Get all orders
router.get('/user/:name', getOrdersByUserName);  // Get orders by user name
router.get('/:id', getOrderById);         // Get order by ID
router.delete('/all', deleteAllOrders);   // Delete all orders
router.delete('/:id', deleteOrderById);   // Delete order by ID

export default router;
