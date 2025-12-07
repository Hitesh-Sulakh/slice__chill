import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import { apiKeyMiddleware, globalErrorHandler } from './middleware/index.js';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// API Key Middleware (Applied to all routes except auth signup/login)
app.use((req, res, next) => {
  if (req.path.includes('/auth/signup') || req.path.includes('/auth/login')) {
    return next();
  }
  apiKeyMiddleware(req, res, next);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use(globalErrorHandler);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/slice_chill', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('MongoDB connected successfully');
  })
  .catch(err => {
    logger.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });

// Start Server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
