# Slice Chill - Retail Food Ordering Portal

A complete, production-ready MERN stack application for ordering Pizza, Drinks, and Breads with JWT authentication, inventory management, and order tracking.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **State Management**: Zustand
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **Security**: x-api-key header validation

## 📋 Project Structure

```
slice_chill/
├── backend/
│   ├── models/              # MongoDB Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── cart.js
│   │   └── order.js
│   ├── middleware/          # Custom middleware
│   │   └── index.js
│   ├── utils/               # Helper functions
│   │   └── logger.js
│   ├── logs/                # Log files
│   ├── server.js            # Express server
│   ├── package.json
│   ├── .env.example
│   └── .eslintrc.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AuthForms.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── Header.jsx
│   │   │   └── LandingPage.jsx
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/           # API & State management
│   │   │   ├── api.js
│   │   │   └── store.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── main.yml         # CI/CD pipeline
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/slice_chill
   JWT_SECRET=your_secure_jwt_secret_key
   API_KEY=slice_chill_api_key_change_in_production
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** in `.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_API_KEY=slice_chill_api_key_change_in_production
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Headers Required (except signup/login)
```
x-api-key: slice_chill_api_key_change_in_production
Authorization: Bearer <token>  (for protected routes)
```

### Authentication Endpoints

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Menu Endpoints

#### Get All Products
```http
GET /menu
x-api-key: slice_chill_api_key_change_in_production

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Margherita Pizza",
      "category": "Pizza",
      "price": 12.99,
      "image_url": "...",
      "quantity_available": 50
    }
  ],
  "count": 20
}
```

#### Get Products by Category
```http
GET /menu/category/Pizza
x-api-key: slice_chill_api_key_change_in_production

Valid categories: Pizza, Drink, Bread
```

#### Get Product by ID
```http
GET /menu/:productId
x-api-key: slice_chill_api_key_change_in_production
```

### Cart Endpoints

#### Validate Cart Items
```http
POST /cart
x-api-key: slice_chill_api_key_change_in_production

{
  "items": [
    {
      "product_id": "...",
      "quantity": 2
    }
  ]
}

Response:
{
  "success": true,
  "items": [
    {
      "product_id": "...",
      "product_name": "Margherita Pizza",
      "quantity": 2,
      "price": 12.99,
      "subtotal": 25.98
    }
  ],
  "total": 25.98
}
```

### Order Endpoints

#### Place Order
```http
POST /order
x-api-key: slice_chill_api_key_change_in_production
Authorization: Bearer <token>

{
  "items": [
    {
      "product_id": "...",
      "quantity": 2
    }
  ],
  "delivery_address": "123 Main St, City"
}

Response:
{
  "success": true,
  "message": "Order placed successfully",
  "order_id": "...",
  "total_amount": 25.98,
  "status": "Placed"
}
```

#### Get Order History
```http
GET /order/history
x-api-key: slice_chill_api_key_change_in_production
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "items": [...],
      "total_amount": 25.98,
      "status": "Placed",
      "timestamp": "2024-12-07T..."
    }
  ]
}
```

#### Get Order by ID
```http
GET /order/:orderId
x-api-key: slice_chill_api_key_change_in_production
Authorization: Bearer <token>
```

#### Update Order Status (Admin Only)
```http
PUT /order/:orderId
x-api-key: slice_chill_api_key_change_in_production
Authorization: Bearer <admin_token>

{
  "status": "Delivered"
}

Valid statuses: Placed, Processing, Delivered, Cancelled
```

## 🛡️ Security Features

### 1. x-api-key Header Validation
- All endpoints (except signup/login) require `x-api-key` header
- Prevents unauthorized API access from non-frontend clients
- Configured in `backend/middleware/index.js`

### 2. JWT Authentication
- Passwords hashed with bcryptjs (salt rounds: 10)
- JWT tokens expire in 24 hours
- Token-based session management on frontend

### 3. Protected Routes
- Frontend routes protected with `ProtectedRoute` wrapper
- Automatic redirect to login for unauthorized access
- Automatic logout on token expiration

### 4. Inventory Validation
- Stock validation before order placement
- Atomic inventory decrement on successful order
- Real-time stock availability checks

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, min 3 chars),
  email: String (unique, email format),
  password_hash: String (bcryptjs hashed),
  role: String (enum: admin, customer),
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: String (enum: Pizza, Drink, Bread),
  price: Number,
  image_url: String,
  quantity_available: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  items: [
    {
      product_id: ObjectId,
      product_name: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],
  total_amount: Number,
  status: String (enum: Placed, Processing, Delivered, Cancelled),
  delivery_address: String,
  timestamp: Date,
  updatedAt: Date
}
```

## 🧪 Testing the Application

### Sample Workflow
1. **Sign Up**: Navigate to `/signup` and create an account
2. **Browse Menu**: Visit `/menu` to see available products
3. **Add to Cart**: Click "Add to Cart" for items
4. **View Cart**: Navigate to `/cart` to review items
5. **Checkout**: Proceed to checkout (requires login)
6. **Confirm Order**: View order confirmation with Order ID
7. **Track Orders**: Visit `/orders` to see order history

### Sample cURL Commands

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Get All Products:**
```bash
curl -X GET http://localhost:5000/api/menu \
  -H "x-api-key: slice_chill_api_key_change_in_production"
```

**Place Order:**
```bash
curl -X POST http://localhost:5000/api/order \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items":[{"product_id":"...","quantity":2}],
    "delivery_address":"123 Main St"
  }'
```

## 📝 Logging

- **Backend Logging**: Winston logger configured in `backend/utils/logger.js`
- **Log Files**: Stored in `backend/logs/` directory
  - `error.log`: Error logs
  - `combined.log`: All logs
- **HTTP Requests**: Morgan middleware logs all requests
- **Development**: Console output with colors

## 🔄 CI/CD Pipeline

GitHub Actions workflow configured in `.github/workflows/main.yml`

**Pipeline Steps:**
1. Code checkout
2. Node.js environment setup
3. Backend ESLint linting
4. Backend tests (if configured)
5. Frontend build
6. Security audit with npm audit

**Trigger Events:**
- Push to `main` or `develop` branches
- Pull requests

## 🚢 Deployment

### Backend Deployment (Render/Heroku)
1. Set environment variables in platform dashboard
2. Connect GitHub repository
3. Deploy from main branch
4. Update `FRONTEND_URL` in environment variables

### Frontend Deployment (Vercel)
1. Connect GitHub repository
2. Set environment variables
3. Build command: `npm run build`
4. Output directory: `dist`

### Environment Variables for Production
```
# Backend
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/slice_chill
JWT_SECRET=<generate_long_random_string>
API_KEY=<generate_unique_api_key>
FRONTEND_URL=https://yourdomain.com

# Frontend
VITE_API_URL=https://api.yourdomain.com/api
VITE_API_KEY=<same_as_backend_API_KEY>
```

## 🛠️ Development Commands

**Backend:**
```bash
# Development server with auto-reload
npm run dev

# Production start
npm start

# Linting
npm run lint

# Testing
npm test
```

**Frontend:**
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📦 Dependencies

**Backend:**
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- dotenv: Environment configuration
- cors: Cross-origin requests
- morgan: HTTP request logger
- winston: Application logging

**Frontend:**
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- zustand: State management
- tailwindcss: Utility-first CSS

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify connection string format

### API Key Not Working
- Ensure `x-api-key` header is sent with requests
- Check API key matches in backend `.env` and frontend `.env.local`
- API key not required for signup/login endpoints

### CORS Errors
- Verify `FRONTEND_URL` is set correctly in backend
- Check that frontend and backend URLs match in CORS configuration

### Cart Not Persisting
- Check browser localStorage is enabled
- Verify cart data in browser DevTools > Application > LocalStorage

## 📄 License

MIT License - feel free to use this project

## 👨‍💻 Author

Built as a complete MERN stack portfolio project demonstrating production-ready code practices.

---

**Last Updated:** December 7, 2024
