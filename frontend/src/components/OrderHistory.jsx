import { useEffect, useState } from 'react';
import { orderAPI } from '../utils/api';

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getOrderHistory();
        setOrders(data.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-8">Loading orders...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
        <p className="text-gray-600">Start ordering delicious food now!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600">Order ID:</p>
                <p className="text-xl font-bold text-primary">{order._id}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Status:</p>
                <p
                  className={`text-xl font-bold ${
                    order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 mb-2 font-semibold">Items:</p>
              {order.items.map((item, idx) => (
                <div key={idx} className="text-gray-700">
                  {item.product_name} x {item.quantity} - ${item.subtotal.toFixed(2)}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-gray-600">Date:</p>
                <p className="font-semibold">
                  {new Date(order.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Total:</p>
                <p className="text-2xl font-bold text-primary">
                  ${order.total_amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
