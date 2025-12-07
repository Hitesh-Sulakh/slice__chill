import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    logger.warn('Request received without x-api-key header');
    return res.status(401).json({ 
      success: false, 
      message: 'Missing x-api-key header' 
    });
  }

  if (apiKey !== process.env.API_KEY) {
    logger.warn(`Invalid x-api-key attempt from ${req.ip}`);
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid API key' 
    });
  }

  next();
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`JWT verification failed: ${error.message}`);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

export const globalErrorHandler = (error, req, res, next) => {
  logger.error(`Error: ${error.message}`, { stack: error.stack });

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export default {
  apiKeyMiddleware,
  authMiddleware,
  globalErrorHandler,
};
