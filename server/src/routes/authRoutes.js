import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // Correct import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router; // Use 'export default' instead of 'module.exports'
