import nodemailer from 'nodemailer';
import logger from './logger.js';

// Create transporter based on environment
const createTransporter = () => {
  // For production, use actual SMTP settings
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // For development, use Ethereal (fake SMTP service) or Gmail
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

// Email templates
const emailTemplates = {
  verification: (username, verificationLink) => ({
    subject: 'Verify Your Email - Slice Chill',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF6B6B, #FFA500); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #FF6B6B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍕 Slice Chill</h1>
          </div>
          <div class="content">
            <h2>Welcome, ${username}!</h2>
            <p>Thank you for registering with Slice Chill. Please verify your email address by clicking the button below:</p>
            <p style="text-align: center;">
              <a href="${verificationLink}" class="button">Verify Email</a>
            </p>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationLink}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account with us, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Slice Chill. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  passwordReset: (username, resetLink) => ({
    subject: 'Reset Your Password - Slice Chill',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF6B6B, #FFA500); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #FF6B6B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍕 Slice Chill</h1>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi ${username},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetLink}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Slice Chill. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  orderConfirmation: (username, order) => ({
    subject: `Order Confirmation #${order._id} - Slice Chill`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF6B6B, #FFA500); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .item-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total-row { display: flex; justify-content: space-between; padding: 15px 0; font-weight: bold; font-size: 18px; color: #FF6B6B; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .status-badge { display: inline-block; background: #4CAF50; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍕 Slice Chill</h1>
          </div>
          <div class="content">
            <h2>Thank you for your order, ${username}!</h2>
            <p>Your order has been confirmed and is being prepared. Here are your order details:</p>
            
            <div class="order-details">
              <p><strong>Order Number:</strong> #${order._id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.timestamp || order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> <span class="status-badge">${order.status}</span></p>
              ${order.delivery_address ? `<p><strong>Delivery Address:</strong> ${order.delivery_address}</p>` : ''}
              
              <h3 style="margin-top: 20px;">Order Items:</h3>
              ${order.items.map(item => `
                <div class="item-row">
                  <span>${item.product_name} x ${item.quantity}</span>
                  <span>$${item.subtotal.toFixed(2)}</span>
                </div>
              `).join('')}
              
              <div class="total-row">
                <span>Total Amount:</span>
                <span>$${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
            
            <p>We'll notify you when your order is ready for delivery.</p>
            <p>If you have any questions about your order, please contact us.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Slice Chill. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Send email function
export const sendEmail = async (to, template, data) => {
  try {
    let emailContent;

    switch (template) {
      case 'verification':
        emailContent = emailTemplates.verification(data.username, data.verificationLink);
        break;
      case 'passwordReset':
        emailContent = emailTemplates.passwordReset(data.username, data.resetLink);
        break;
      case 'orderConfirmation':
        emailContent = emailTemplates.orderConfirmation(data.username, data.order);
        break;
      default:
        throw new Error(`Unknown email template: ${template}`);
    }

    const mailOptions = {
      from: `"Slice Chill" <${process.env.SMTP_USER || 'noreply@slicechill.com'}>`,
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${to}: ${info.messageId}`);

    // In development, log the preview URL (Ethereal)
    if (process.env.NODE_ENV !== 'production') {
      logger.info(`Email preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// Create Ethereal test account for development
export const createTestAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    logger.info('Ethereal test account created:');
    logger.info(`Email: ${testAccount.user}`);
    logger.info(`Password: ${testAccount.pass}`);
    return testAccount;
  } catch (error) {
    logger.error(`Error creating test account: ${error.message}`);
    return null;
  }
};

export default { sendEmail, createTestAccount };
