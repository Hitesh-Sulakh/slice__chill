import { useLocation, useNavigate } from 'react-router-dom';

export const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  if (!orderId) {
    return navigate('/menu');
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center py-12">
      <div className="bg-green-100 rounded-lg p-8 mb-6">
        <div className="text-5xl text-green-600 mb-4">✓</div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">Order Confirmed!</h2>
      </div>

      <p className="text-gray-600 mb-4 text-lg">
        Thank you for your order. Your food will be delivered shortly.
      </p>

      <div className="bg-gray-100 rounded-lg p-6 mb-6">
        <p className="text-gray-600 mb-2">Order ID:</p>
        <p className="text-2xl font-bold text-primary">{orderId}</p>
        <p className="text-gray-600 mt-4 mb-2">Total Amount:</p>
        <p className="text-2xl font-bold">${total?.toFixed(2) || '0.00'}</p>
      </div>

      <p className="text-gray-600 mb-6">
        You can track your order status in your order history.
      </p>

      <button
        onClick={() => navigate('/menu')}
        className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-red-700 mb-2"
      >
        Continue Shopping
      </button>

      <button
        onClick={() => navigate('/orders')}
        className="w-full bg-secondary text-white py-2 rounded-lg font-bold hover:bg-orange-600"
      >
        View Order History
      </button>
    </div>
  );
};
