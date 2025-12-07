import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      product_name: String,
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  ],
  total_amount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0,
  },
  status: {
    type: String,
    enum: ['Placed', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Placed',
  },
  delivery_address: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for user queries
orderSchema.index({ user_id: 1, timestamp: -1 });

export default mongoose.model('Order', orderSchema);
