import express from 'express';
import {
  placeOrder,
  getOrderHistory,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/index.js';

const router = express.Router();

// POST /api/order - Place an order
router.post('/', authMiddleware, placeOrder);

// GET /api/order/history - Get user's order history
router.get('/history', authMiddleware, getOrderHistory);

// GET /api/order/:orderId - Get order by ID
router.get('/:orderId', authMiddleware, getOrderById);

// PUT /api/order/:orderId - Update order status (admin only)
router.put('/:orderId', authMiddleware, updateOrderStatus);

export default router;
