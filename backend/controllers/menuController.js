import Product from '../models/Product.js';
import logger from '../utils/logger.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    logger.error(`Error fetching all products: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Validate category
    const validCategories = ['Pizza', 'Drink', 'Bread'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Valid categories are: ${validCategories.join(', ')}`,
      });
    }

    const products = await Product.find({ category });

    res.status(200).json({
      success: true,
      category,
      data: products,
      count: products.length,
    });
  } catch (error) {
    logger.error(`Error fetching products by category: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Error fetching product by ID: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
    });
  }
};

export default {
  getAllProducts,
  getProductsByCategory,
  getProductById,
};
