import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuthStore } from '../utils/store';

export const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await authAPI.login(formData.email, formData.password);
      login(data.user, data.token);
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-primary font-bold hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export const SignupForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.signup(formData.username, formData.email, formData.password);
      const { data } = await authAPI.login(formData.email, formData.password);
      login(data.user, data.token);
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password (min 6 characters)"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-primary font-bold hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
};
