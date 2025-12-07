import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const products = [
  // Pizzas
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    category: 'Pizza',
    price: 12.99,
    image_url: 'https://via.placeholder.com/300?text=Margherita+Pizza',
    quantity_available: 50,
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Traditional pizza topped with pepperoni and cheese',
    category: 'Pizza',
    price: 14.99,
    image_url: 'https://via.placeholder.com/300?text=Pepperoni+Pizza',
    quantity_available: 45,
  },
  {
    name: 'Vegetarian Pizza',
    description: 'Fresh vegetables with mozzarella on crispy crust',
    category: 'Pizza',
    price: 13.99,
    image_url: 'https://via.placeholder.com/300?text=Vegetarian+Pizza',
    quantity_available: 40,
  },
  {
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and onions',
    category: 'Pizza',
    price: 15.99,
    image_url: 'https://via.placeholder.com/300?text=BBQ+Chicken+Pizza',
    quantity_available: 35,
  },

  // Drinks
  {
    name: 'Coca Cola',
    description: 'Cold refreshing cola drink',
    category: 'Drink',
    price: 2.99,
    image_url: 'https://via.placeholder.com/300?text=Coca+Cola',
    quantity_available: 100,
  },
  {
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice',
    category: 'Drink',
    price: 3.99,
    image_url: 'https://via.placeholder.com/300?text=Orange+Juice',
    quantity_available: 80,
  },
  {
    name: 'Iced Tea',
    description: 'Refreshing iced tea with lemon',
    category: 'Drink',
    price: 2.49,
    image_url: 'https://via.placeholder.com/300?text=Iced+Tea',
    quantity_available: 90,
  },
  {
    name: 'Lemonade',
    description: 'Homemade fresh lemonade',
    category: 'Drink',
    price: 3.49,
    image_url: 'https://via.placeholder.com/300?text=Lemonade',
    quantity_available: 70,
  },

  // Breads
  {
    name: 'Garlic Bread',
    description: 'Warm garlic bread with Italian seasoning',
    category: 'Bread',
    price: 4.99,
    image_url: 'https://via.placeholder.com/300?text=Garlic+Bread',
    quantity_available: 60,
  },
  {
    name: 'Focaccia Bread',
    description: 'Italian focaccia with olive oil and herbs',
    category: 'Bread',
    price: 5.99,
    image_url: 'https://via.placeholder.com/300?text=Focaccia+Bread',
    quantity_available: 40,
  },
  {
    name: 'Sourdough Bread',
    description: 'Artisan sourdough bread with tangy flavor',
    category: 'Bread',
    price: 4.49,
    image_url: 'https://via.placeholder.com/300?text=Sourdough+Bread',
    quantity_available: 50,
  },
  {
    name: 'Multigrain Bread',
    description: 'Healthy multigrain bread with seeds',
    category: 'Bread',
    price: 5.49,
    image_url: 'https://via.placeholder.com/300?text=Multigrain+Bread',
    quantity_available: 55,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/slice_chill');
    
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert seed data
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    console.log('\nSample products created:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (${product.category}): $${product.price}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
