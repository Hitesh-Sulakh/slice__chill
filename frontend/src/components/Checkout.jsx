import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import { useCartStore } from '../utils/store';

export const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await orderAPI.placeOrder(items, deliveryAddress);
      clearCart();
      navigate('/order-confirmation', { state: { orderId: data.order_id, total: data.total_amount } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        {items.map((item) => (
          <div key={item.product_id} className="flex justify-between py-2 border-b">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between py-4 text-lg font-bold bg-gray-100 px-4 rounded mt-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter your delivery address"
          rows="4"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/cart')}
          className="w-full mt-3 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-700"
        >
          Back to Cart
        </button>
      </form>
    </div>
  );
};
