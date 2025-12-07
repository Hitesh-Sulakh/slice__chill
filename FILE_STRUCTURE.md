# Complete File Structure

This document shows the complete project structure after full implementation.

```
slice_chill/
│
├── backend/
│   ├── models/
│   │   ├── User.js                 # User schema with password hashing
│   │   ├── Product.js              # Product schema with inventory
│   │   └── Order.js                # Order schema with items array
│   │
│   ├── controllers/
│   │   ├── authController.js       # Signup, login, logout logic
│   │   ├── menuController.js       # Product retrieval and filtering
│   │   ├── cartController.js       # Cart validation logic
│   │   └── orderController.js      # Order creation and tracking
│   │
│   ├── routes/
│   │   ├── auth.js                 # Auth endpoints
│   │   ├── menu.js                 # Menu endpoints
│   │   ├── cart.js                 # Cart endpoints
│   │   └── order.js                # Order endpoints
│   │
│   ├── middleware/
│   │   └── index.js                # API key, JWT, error handling
│   │
│   ├── utils/
│   │   └── logger.js               # Winston logging setup
│   │
│   ├── logs/
│   │   ├── error.log               # Error logs
│   │   └── combined.log            # All logs
│   │
│   ├── .eslintrc.json              # ESLint configuration
│   ├── .env.example                # Environment template
│   ├── .gitignore                  # Git ignore patterns
│   ├── Dockerfile                  # Docker image for backend
│   ├── package.json                # Dependencies and scripts
│   ├── seed.js                     # Database seeding script
│   └── server.js                   # Main Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthForms.jsx       # Login & Signup forms
│   │   │   ├── Menu.jsx            # Product grid display
│   │   │   ├── Cart.jsx            # Shopping cart page
│   │   │   ├── Checkout.jsx        # Order checkout
│   │   │   ├── OrderConfirmation.jsx # Success page
│   │   │   ├── OrderHistory.jsx    # Order tracking
│   │   │   ├── Header.jsx          # Navigation bar
│   │   │   └── LandingPage.jsx     # Welcome page
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js              # Axios API client
│   │   │   └── store.js            # Zustand state stores
│   │   │
│   │   ├── styles/
│   │   │   └── index.css           # Global and Tailwind CSS
│   │   │
│   │   ├── App.jsx                 # Router and main app
│   │   └── main.jsx                # React DOM entry
│   │
│   ├── public/                     # Static assets (empty)
│   │
│   ├── .env.example                # Environment template
│   ├── .gitignore                  # Git ignore patterns
│   ├── Dockerfile                  # Docker image for frontend
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies and scripts
│   ├── postcss.config.js           # PostCSS config
│   ├── tailwind.config.js          # Tailwind configuration
│   └── vite.config.js              # Vite configuration
│
├── .github/
│   └── workflows/
│       └── main.yml                # GitHub Actions CI/CD pipeline
│
├── .gitignore                      # Root level git ignore
├── docker-compose.yml              # Docker Compose configuration
│
├── README.md                       # Main documentation (850+ lines)
├── QUICKSTART.md                   # Quick start guide (300+ lines)
├── API_TESTING.md                  # API testing guide (400+ lines)
├── DELIVERY_SUMMARY.md             # Project delivery summary
└── FILE_STRUCTURE.md               # This file

```

---

## Directory Details

### Backend Structure

#### Models (`/backend/models/`)
- **User.js**: User schema with bcrypt password hashing and comparison
- **Product.js**: Product schema with category and inventory
- **Order.js**: Order schema with nested items and status tracking

#### Controllers (`/backend/controllers/`)
- **authController.js**: 3 functions (signup, login, logout)
- **menuController.js**: 3 functions (getAllProducts, getByCategory, getById)
- **cartController.js**: 1 function (validateCartItems)
- **orderController.js**: 4 functions (placeOrder, getHistory, getById, updateStatus)

#### Routes (`/backend/routes/`)
- **auth.js**: Auth routes with signup/login/logout
- **menu.js**: Menu endpoints for product retrieval
- **cart.js**: Cart validation endpoint
- **order.js**: Order management endpoints

#### Middleware (`/backend/middleware/`)
- **index.js**: Contains 3 middleware functions
  - apiKeyMiddleware: x-api-key header validation
  - authMiddleware: JWT token verification
  - globalErrorHandler: Centralized error handling

#### Utilities (`/backend/utils/`)
- **logger.js**: Winston logger with file and console transports

### Frontend Structure

#### Components (`/frontend/src/components/`)
- **AuthForms.jsx**: LoginForm and SignupForm components
- **Menu.jsx**: Product grid with category filtering
- **Cart.jsx**: Shopping cart with quantity management
- **Checkout.jsx**: Order placement form
- **OrderConfirmation.jsx**: Success message with order ID
- **OrderHistory.jsx**: User's past orders table
- **Header.jsx**: Navigation bar with user menu and cart count
- **LandingPage.jsx**: Welcome page with featured products

#### Utils (`/frontend/src/utils/`)
- **api.js**: Axios instance with interceptors for auth and API key
- **store.js**: Zustand stores for auth and cart state

#### Styles (`/frontend/src/styles/`)
- **index.css**: Tailwind directives and global styles

#### Entry Points
- **App.jsx**: React Router setup with protected routes
- **main.jsx**: React DOM rendering
- **index.html**: HTML template with root div

---

## File Statistics

### Code Files
| Type | Count | Files |
|------|-------|-------|
| Backend Controllers | 4 | authController.js, menuController.js, cartController.js, orderController.js |
| Backend Routes | 4 | auth.js, menu.js, cart.js, order.js |
| Backend Models | 3 | User.js, Product.js, Order.js |
| Backend Utils/Middleware | 2 | logger.js, middleware/index.js |
| Frontend Components | 8 | All .jsx files in components/ |
| Frontend Utilities | 2 | api.js, store.js |
| Configuration | 9 | vite.config.js, tailwind.config.js, postcss.config.js, etc |
| **Total** | **32+** | **Production-ready code** |

### Documentation Files
| File | Lines | Purpose |
|------|-------|---------|
| README.md | 850+ | Complete reference guide |
| QUICKSTART.md | 300+ | Fast setup instructions |
| API_TESTING.md | 400+ | Detailed API testing |
| DELIVERY_SUMMARY.md | 200+ | Project completion summary |
| FILE_STRUCTURE.md | This | Directory organization |

---

## Code Organization Principles

### Backend (`models/` → `controllers/` → `routes/`)
1. **Models**: Define data structure
2. **Controllers**: Implement business logic
3. **Routes**: Map HTTP requests to controllers
4. **Middleware**: Cross-cutting concerns

### Frontend (Components → Utils → App)
1. **Components**: Reusable UI elements
2. **Utils**: API calls and state management
3. **App**: Main router and layout

### Configuration
- Environment variables: `.env`, `.env.example`, `.env.local`
- Build tools: `vite.config.js`, `postcss.config.js`
- Styling: `tailwind.config.js`
- Quality: `.eslintrc.json`

---

## Key Files Explained

### Backend Entry Point
- **server.js** (50 lines)
  - Express app setup
  - Middleware configuration
  - Database connection
  - Route registration
  - Error handling
  - Server startup

### Frontend Entry Point
- **App.jsx** (40 lines)
  - Router setup
  - Protected routes
  - Component routing
  - Navigation structure

### API Integration
- **api.js** (55 lines)
  - Axios instance creation
  - x-api-key header injection
  - JWT token auto-injection
  - Error handling interceptors
  - All API methods organized by resource

### State Management
- **store.js** (80 lines)
  - useAuthStore for authentication
  - useCartStore for shopping cart
  - Local storage persistence
  - Cart calculation methods

---

## Important Configuration Files

### Backend
- `.env.example`: Database URL, JWT secret, API key
- `package.json`: Dependencies (express, mongoose, jsonwebtoken, etc)
- `.eslintrc.json`: Code quality rules

### Frontend
- `.env.example`: API URL, API key
- `package.json`: Dependencies (react, axios, zustand, etc)
- `vite.config.js`: Build and dev server config
- `tailwind.config.js`: Custom theme colors

### DevOps
- `docker-compose.yml`: Full stack orchestration
- `.github/workflows/main.yml`: CI/CD automation
- `backend/Dockerfile`: Backend containerization
- `frontend/Dockerfile`: Frontend multi-stage build

---

## Database Files

### Seed Script
- **backend/seed.js**
  - 12 sample products
  - 4 categories (Pizza, Drink, Bread)
  - Realistic pricing
  - Stock quantities

### Schema Files (Models)
- **User.js**: 50 lines with validation and methods
- **Product.js**: 40 lines with indexing
- **Order.js**: 60 lines with nested structure

---

## Example File Paths

```
# Get all products (Frontend)
frontend/src/components/Menu.jsx → uses api.menuAPI.getAllProducts()

# Get products (Backend)
backend/routes/menu.js → calls menuController.getAllProducts()
backend/controllers/menuController.js → queries Product model

# Place order (Frontend)
frontend/src/components/Checkout.jsx → uses api.orderAPI.placeOrder()

# Place order (Backend)
backend/routes/order.js → calls orderController.placeOrder()
backend/controllers/orderController.js → validates inventory & creates Order

# User login (Frontend)
frontend/src/components/AuthForms.jsx → uses api.authAPI.login()

# User login (Backend)
backend/routes/auth.js → calls authController.login()
backend/controllers/authController.js → validates credentials & returns JWT
```

---

## Starting Points for Modifications

### To Add New Product Category
1. Edit `backend/seed.js` - add new product
2. Verify category in `backend/models/Product.js`
3. Update frontend if UI needs changes

### To Modify API Key
1. Update in `backend/.env`
2. Update in `frontend/.env.local`
3. Restart both servers

### To Add New Endpoint
1. Create controller method in `backend/controllers/`
2. Add route in `backend/routes/`
3. Add API method in `frontend/src/utils/api.js`
4. Create component if needed in `frontend/src/components/`

### To Change Styling
- Edit Tailwind classes in components
- Or modify `frontend/tailwind.config.js` for custom colors
- Or edit `frontend/src/styles/index.css` for globals

---

## Environment Variable Files

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/slice_chill
JWT_SECRET=your_jwt_secret_key_change_in_production
API_KEY=slice_chill_api_key_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env.local`
```
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=slice_chill_api_key_change_in_production
```

---

## Log Files Location

- **backend/logs/error.log** - Error messages only
- **backend/logs/combined.log** - All log messages
- **Console output** - Development logging with colors

---

## This Structure Ensures

✅ Clear separation of concerns
✅ Easy to navigate and understand
✅ Simple to add new features
✅ Scalable architecture
✅ Production-ready code
✅ Maintainable long-term
✅ Team collaboration friendly

---

See [README.md](README.md) for complete documentation or [QUICKSTART.md](QUICKSTART.md) for setup instructions.
