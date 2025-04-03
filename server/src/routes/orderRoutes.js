import express from 'express';
import { createOrder, getAllOrders, getUserOrders, getOrderById, deleteAllOrders, deleteOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; 
const router = express.Router();

router.post('/', protect, createOrder);          
router.get('/', protect, getAllOrders);            
router.get('/user/orders', protect, getUserOrders); 
router.get('/:id', protect, getOrderById);         
router.delete('/all', protect, deleteAllOrders);   
router.delete('/:id', protect, deleteOrderById);   

export default router;
