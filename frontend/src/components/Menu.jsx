import { useEffect, useState } from 'react';
import { menuAPI } from '../utils/api';
import { useCartStore } from '../utils/store';

export const Menu = ({ category = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = category
          ? await menuAPI.getProductsByCategory(category)
          : await menuAPI.getAllProducts();
        setProducts(data.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    addItem({
      product_id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      image_url: product.image_url,
    });
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
              <span className="text-sm text-gray-500">
                {product.quantity_available > 0
                  ? `${product.quantity_available} in stock`
                  : 'Out of stock'}
              </span>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.quantity_available === 0}
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.quantity_available > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
