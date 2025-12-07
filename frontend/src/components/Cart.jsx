import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../utils/store';

export const Cart = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    useCartStore.getState().calculateTotal();
  }, [items]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-bold">Product</th>
              <th className="px-6 py-3 text-left font-bold">Price</th>
              <th className="px-6 py-3 text-left font-bold">Quantity</th>
              <th className="px-6 py-3 text-left font-bold">Subtotal</th>
              <th className="px-6 py-3 text-left font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product_id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{item.name}</td>
                <td className="px-6 py-3">${item.price}</td>
                <td className="px-6 py-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product_id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-6 py-3 font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-6">
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Order Total</h3>
          <p className="text-3xl font-bold">${total.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={() => navigate('/menu')}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700"
        >
          Continue Shopping
        </button>
        <button
          onClick={handleCheckout}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
