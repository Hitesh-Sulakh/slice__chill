import Order from '../models/Order.js';
import Product from '../models/Product.js';
import logger from '../utils/logger.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, delivery_address } = req.body;
    const userId = req.user.id;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items must be a non-empty array',
      });
    }

    // Check stock availability and prepare order items
    const orderItems = [];
    let totalAmount = 0;
    const productUpdates = [];

    for (const item of items) {
      const product = await Product.findById(item.product_id);

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
      totalAmount += subtotal;

      orderItems.push({
        product_id: product._id,
        product_name: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });

      // Store product update operation
      productUpdates.push({
        productId: product._id,
        quantityToDecrement: item.quantity,
      });
    }

    // Decrement inventory for all products
    for (const update of productUpdates) {
      await Product.findByIdAndUpdate(
        update.productId,
        { $inc: { quantity_available: -update.quantityToDecrement } },
        { new: true }
      );
    }

    // Create order
    const order = new Order({
      user_id: userId,
      items: orderItems,
      total_amount: totalAmount,
      delivery_address: delivery_address || '',
      status: 'Placed',
    });

    await order.save();

    logger.info(`Order placed successfully - Order ID: ${order._id}, User: ${userId}`);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order_id: order._id,
      total_amount: totalAmount,
      status: order.status,
    });
  } catch (error) {
    logger.error(`Error placing order: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error placing order',
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user_id: userId })
      .sort({ timestamp: -1 })
      .populate('items.product_id', 'name category price');

    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    logger.error(`Error fetching order history: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching order history',
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findById(orderId)
      .populate('items.product_id', 'name category price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Ensure user can only see their own orders
    if (order.user_id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error(`Error fetching order by ID: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can update order status',
      });
    }

    const validStatuses = ['Placed', 'Processing', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    logger.info(`Order status updated - Order ID: ${orderId}, Status: ${status}`);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    logger.error(`Error updating order status: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
    });
  }
};

export default {
  placeOrder,
  getOrderHistory,
  getOrderById,
  updateOrderStatus,
};
