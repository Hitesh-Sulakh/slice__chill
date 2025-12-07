import Product from '../models/Product.js';
import logger from '../utils/logger.js';

// Cart is managed on frontend, but we can provide validation endpoints
export const validateCartItems = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array',
      });
    }

    // Fetch all products mentioned in cart
    const productIds = items.map(item => item.product_id);
    const products = await Product.find({ _id: { $in: productIds } });

    // Validate items and calculate total
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product_id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.product_id} not found`,
        });
      }

      if (item.quantity > product.quantity_available) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}. Available: ${product.quantity_available}`,
        });
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      validatedItems.push({
        product_id: product._id,
        product_name: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });
    }

    res.status(200).json({
      success: true,
      items: validatedItems,
      total,
    });
  } catch (error) {
    logger.error(`Error validating cart: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error validating cart',
    });
  }
};

export default {
  validateCartItems,
};
