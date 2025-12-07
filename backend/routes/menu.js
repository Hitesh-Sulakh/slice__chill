import express from 'express';
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from '../controllers/menuController.js';

const router = express.Router();

// GET /api/menu - Get all products
router.get('/', getAllProducts);

// GET /api/menu/:category - Get products by category
router.get('/category/:category', getProductsByCategory);

// GET /api/menu/:productId - Get product by ID
router.get('/:productId', getProductById);

export default router;
