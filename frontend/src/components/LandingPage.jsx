import { useState } from 'react';
import { Menu } from './Menu';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Pizza',
    icon: '🍕',
    description: 'Fresh baked pizzas with premium toppings',
    bgColor: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
  },
  {
    name: 'Drink',
    icon: '🥤',
    description: 'Refreshing beverages to quench your thirst',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    name: 'Bread',
    icon: '🥖',
    description: 'Artisan breads baked fresh daily',
    bgColor: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-600',
  },
];

export const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="bg-gradient-to-b from-primary to-orange-100">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Slice Chill</h1>
        <p className="text-2xl mb-8">Order your favorite Pizza, Drinks, and Bread</p>
        <p className="text-xl mb-12 opacity-90">
          Fast delivery. Fresh ingredients. Great taste.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-dark text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
        >
          Start Ordering Now
        </Link>
      </div>

      {/* Category Filter Cards */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => 
                  setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                  )
                }
                className={`p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? `${category.bgColor} text-white ring-4 ring-offset-2 ring-${category.bgColor}`
                    : 'bg-white text-gray-800 hover:shadow-xl'
                }`}
              >
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className={`text-sm ${
                  selectedCategory === category.name ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                {selectedCategory === category.name && (
                  <span className="inline-block mt-3 text-sm bg-white/20 px-3 py-1 rounded-full">
                    ✓ Selected
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Show All Button */}
          {selectedCategory && (
            <div className="text-center mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:text-red-700 font-semibold underline"
              >
                Show All Products
              </button>
            </div>
          )}

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {selectedCategory ? `${selectedCategory} Menu` : 'Popular Items'}
          </h2>
          <Menu category={selectedCategory} />
        </div>
      </div>
    </div>
  );
};
