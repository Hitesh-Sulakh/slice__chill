import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Pizza', 'Drink', 'Bread'],
    required: [true, 'Category is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  image_url: {
    type: String,
    default: 'https://via.placeholder.com/300',
  },
  quantity_available: {
    type: Number,
    required: [true, 'Quantity available is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for category filtering
productSchema.index({ category: 1 });

export default mongoose.model('Product', productSchema);
