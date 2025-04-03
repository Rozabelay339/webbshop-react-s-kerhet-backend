import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  getProductByName, 
  getProductsByCategory 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);  
router.get('/name/:name', getProductByName);  
router.get('/category/:category', getProductsByCategory);  
router.get('/:id', getProductById);  
router.post('/', createProduct);  

export default router;
