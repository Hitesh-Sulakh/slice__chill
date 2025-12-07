import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

export const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage(data.message);
        // Redirect to login after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {status === 'verifying' && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
            <Link
              to="/login"
              className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="space-y-2">
              <Link
                to="/resend-verification"
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Resend Verification Email
              </Link>
              <br />
              <Link to="/login" className="text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { data } = await authAPI.resendVerification(email);
      setStatus('success');
      setMessage(data.message);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to resend verification email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Resend Verification Email
          </h2>

          {status === 'success' ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-green-600 mb-4">{message}</p>
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
                {status === 'loading' ? 'Sending...' : 'Resend Verification Email'}
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
