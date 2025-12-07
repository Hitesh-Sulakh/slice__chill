import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { LoginForm, SignupForm } from './components/AuthForms';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { OrderHistory } from './components/OrderHistory';
import { LandingPage } from './components/LandingPage';
import { VerifyEmail, ResendVerification } from './components/EmailVerification';
import { ForgotPassword, ResetPassword } from './components/PasswordReset';
import { useAuthStore } from './utils/store';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Email verification routes */}
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          
          {/* Password reset routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}
