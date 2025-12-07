import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../utils/store';

export const Header = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const cartItems = useCartStore((state) => state.items);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-dark text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-secondary">
          🍕 Slice Chill
        </Link>
        <div className="text-red-500 font-bold"> We are under maintenance</div>

        <nav className="flex gap-6 items-center">
          <Link to="/menu" className="hover:text-secondary transition">
            Menu
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/orders" className="hover:text-secondary transition">
                Orders
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-sm">{user?.username}</span>
            </>
          )}

          <Link
            to="/cart"
            className="relative hover:text-secondary transition"
          >
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-primary px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-primary px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
