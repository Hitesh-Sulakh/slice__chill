import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import logger from '../utils/logger.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email or username',
      });
    }

    // Create new user (no email verification required)
    const user = new User({
      username,
      email,
      password_hash: password,
      isEmailVerified: true, // Auto-verified
    });

    await user.save();

    logger.info(`New user registered: ${username}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid verification token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    // Verify the user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    logger.info(`Email verified for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully. You can now login.',
    });
  } catch (error) {
    logger.error(`Email verification error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error verifying email',
    });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email',
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified',
      });
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    await sendEmail(email, 'verification', {
      username: user.username,
      verificationLink,
    });

    logger.info(`Verification email resent to: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    logger.error(`Resend verification error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error resending verification email',
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists for security
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate password reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send password reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(email, 'passwordReset', {
      username: user.username,
      resetLink,
    });

    logger.info(`Password reset email sent to: ${email}`);

    res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error sending password reset email',
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'New password is required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Update password
    user.password_hash = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    logger.info(`Password reset successful for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.',
    });
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password_hash');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
    });
  }
};

export const logout = (req, res) => {
  // JWT is stateless, logout happens on the client side
  logger.info(`User logged out: ${req.user?.email}`);
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

export default {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
};
