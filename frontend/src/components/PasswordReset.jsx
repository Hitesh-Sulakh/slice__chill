import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { data } = await authAPI.forgotPassword(email);
      setStatus('success');
      setMessage(data.message);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Forgot Password?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email and we'll send you a reset link
          </p>

          {status === 'success' ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-green-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500 mb-4">
                Check your inbox for the password reset link
              </p>
              <Link to="/login" className="text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="mt-4 text-center">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters');
      return;
    }

    setStatus('loading');

    try {
      const { data } = await authAPI.resetPassword(token, password);
      setStatus('success');
      setMessage(data.message);
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Reset Your Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your new password below
          </p>

          {status === 'success' ? (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-green-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500 mb-4">Redirecting to login...</p>
              <Link
                to="/login"
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
              >
                {status === 'loading' ? 'Resetting...' : 'Reset Password'}
              </button>

              <div className="mt-4 text-center">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
