import express from 'express';
import { validateCartItems } from '../controllers/cartController.js';

const router = express.Router();

// POST /api/cart - Validate cart items
router.post('/', validateCartItems);

export default router;
