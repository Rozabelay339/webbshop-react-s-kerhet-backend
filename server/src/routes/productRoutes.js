import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Define routes for products
router.get('/', getProducts);  // GET all products
router.get('/:id', getProductById);  // GET a product by ID
router.post('/', createProduct);  // POST create a new product

export default router;
