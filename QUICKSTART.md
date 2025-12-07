# Quick Start Guide

This guide will help you get the Slice Chill application running locally in minutes.

## Prerequisites

- **Node.js** v18 or higher ([download](https://nodejs.org))
- **MongoDB** (local or cloud)
  - Local: [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Git** ([download](https://git-scm.com))
- A code editor (VS Code recommended)

## Step 1: Clone and Setup Project

```bash
# Navigate to your workspace
cd /Users/hiteshsulakh/Desktop/slice_chill

# Verify you're in the right directory
pwd
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
```bash
# Start MongoDB service (macOS with Homebrew)
brew services start mongodb-community

# Or start it manually
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/slice_chill`

## Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/slice_chill
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
API_KEY=slice_chill_api_key_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF

# Seed database with sample products
node seed.js

# Start backend server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

## Step 4: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << 'EOF'
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=slice_chill_api_key_change_in_production
EOF

# Start frontend development server
npm run dev
```

You should see:
```
VITE v5.0.0  ready in 123 ms

➜  Local:   http://localhost:5000
➜  press h to show help
```

## Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## First Time Usage

1. **Sign Up**: Create a new account
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`

2. **Browse Menu**: Click "Menu" to see pizzas, drinks, and breads

3. **Add to Cart**: Click "Add to Cart" on any product

4. **View Cart**: Click the cart icon to review your order

5. **Checkout**: Click "Proceed to Checkout"
   - You'll be prompted to login if not already
   - Enter delivery address
   - Click "Place Order"

6. **View Orders**: Visit "Orders" page to see order history

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# If in use, kill the process
kill -9 <PID>

# Or change PORT in .env to different port
```

### MongoDB connection error
```bash
# Check MongoDB status
brew services list

# Restart MongoDB
brew services restart mongodb-community

# Or use MongoDB Atlas connection string instead
```

### Frontend can't connect to backend
- Ensure backend is running (`npm run dev` in backend folder)
- Check `VITE_API_URL` in `.env.local`
- Check browser console for error messages (F12)

### Port already in use
```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# Kill process
kill -9 <PID>
```

### Clear everything and start fresh
```bash
# Backend
cd backend
rm -rf node_modules
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm run dev
```

## Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/slice_chill |
| JWT_SECRET | Secret for JWT tokens | super_secret_key |
| API_KEY | API key for header validation | slice_chill_key |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend application URL | http://localhost:3000 |

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |
| VITE_API_KEY | x-api-key header value | slice_chill_key |

## API Testing

### Using cURL

**Test Backend Health:**
```bash
curl http://localhost:5000/api/health
```

**Get All Products:**
```bash
curl -H "x-api-key: slice_chill_api_key_change_in_production" \
  http://localhost:5000/api/menu
```

**Sign Up:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"test@example.com",
    "password":"password123"
  }'
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import API endpoints (see README.md for full API docs)
3. Add `x-api-key` header to requests
4. Add `Authorization: Bearer <token>` for protected routes

## Next Steps

- Explore the code structure
- Modify styles in `frontend/src/styles/`
- Add new products in `backend/seed.js`
- Customize the landing page
- Deploy to production (see README.md)

## Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm run lint         # Run ESLint
npm test            # Run tests
npm start           # Production start

# Frontend
cd frontend
npm install         # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint

# Database
node seed.js        # Seed database with sample products
```

## File Structure Quick Reference

```
slice_chill/
├── backend/          # Node.js/Express API
│   ├── models/       # MongoDB schemas
│   ├── controllers/  # Request handlers
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── seed.js       # Database seeding
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── utils/       # API & state management
│   │   └── App.jsx      # Main app component
│   └── vite.config.js   # Vite configuration
└── README.md         # Full documentation
```

## Getting Help

1. Check the main [README.md](../README.md) for API documentation
2. Review code comments in backend/controllers/ for logic
3. Check browser console (F12) for frontend errors
4. Check backend logs in terminal for API errors

## Tips

- Use VS Code REST Client extension for testing APIs
- Keep MongoDB running in the background
- Check logs if something doesn't work
- Clear browser cache if UI doesn't update (Cmd+Shift+R)
- Use browser DevTools Network tab to debug API calls

---

Need help? Check the troubleshooting section or review the main README.md file.
