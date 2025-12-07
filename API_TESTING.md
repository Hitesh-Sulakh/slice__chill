# API Testing Guide

This document provides detailed examples for testing all Slice Chill API endpoints.

## Base Information

- **Base URL**: `http://localhost:5000/api`
- **Default API Key**: `slice_chill_api_key_change_in_production`
- **Default JWT Secret**: `your_jwt_secret_key_change_in_production`

## Authentication Endpoints

### 1. Sign Up
Creates a new user account.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2024-12-07T10:00:00Z"
  }
}
```

**Validation Rules:**
- Username: minimum 3 characters, unique
- Email: valid email format, unique
- Password: minimum 6 characters

### 2. Login
Authenticates user and returns JWT token.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

**Save the token** for subsequent authenticated requests.

### 3. Logout
Logs out the current user (JWT-based, token removed on client).

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Menu Endpoints

### 1. Get All Products
Retrieves all available products.

**Request:**
```bash
curl -X GET http://localhost:5000/api/menu \
  -H "x-api-key: slice_chill_api_key_change_in_production"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Margherita Pizza",
      "description": "Classic pizza with tomato, mozzarella, and basil",
      "category": "Pizza",
      "price": 12.99,
      "image_url": "https://via.placeholder.com/300",
      "quantity_available": 50,
      "createdAt": "2024-12-07T10:00:00Z"
    }
  ],
  "count": 20
}
```

### 2. Get Products by Category
Filters products by category.

**Request:**
```bash
curl -X GET "http://localhost:5000/api/menu/category/Pizza" \
  -H "x-api-key: slice_chill_api_key_change_in_production"
```

**Valid Categories:**
- `Pizza`
- `Drink`
- `Bread`

**Response:**
```json
{
  "success": true,
  "category": "Pizza",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Margherita Pizza",
      "category": "Pizza",
      "price": 12.99,
      "quantity_available": 50
    }
  ],
  "count": 4
}
```

### 3. Get Product by ID
Retrieves a specific product.

**Request:**
```bash
curl -X GET "http://localhost:5000/api/menu/507f1f77bcf86cd799439012" \
  -H "x-api-key: slice_chill_api_key_change_in_production"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato, mozzarella, and basil",
    "category": "Pizza",
    "price": 12.99,
    "image_url": "https://via.placeholder.com/300",
    "quantity_available": 50
  }
}
```

## Cart Endpoints

### 1. Validate Cart Items
Validates items and calculates total.

**Request:**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "product_id": "507f1f77bcf86cd799439012",
        "quantity": 2
      },
      {
        "product_id": "507f1f77bcf86cd799439013",
        "quantity": 1
      }
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "product_id": "507f1f77bcf86cd799439012",
      "product_name": "Margherita Pizza",
      "quantity": 2,
      "price": 12.99,
      "subtotal": 25.98
    },
    {
      "product_id": "507f1f77bcf86cd799439013",
      "product_name": "Coca Cola",
      "quantity": 1,
      "price": 2.99,
      "subtotal": 2.99
    }
  ],
  "total": 28.97
}
```

## Order Endpoints

### 1. Place Order
Creates a new order and decrements inventory.

**Request:**
```bash
curl -X POST http://localhost:5000/api/order \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "product_id": "507f1f77bcf86cd799439012",
        "quantity": 2
      }
    ],
    "delivery_address": "123 Main Street, Apartment 4B, New York, NY 10001"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order_id": "607f1f77bcf86cd799439100",
  "total_amount": 25.98,
  "status": "Placed"
}
```

**Important:**
- User must be authenticated
- Items array cannot be empty
- Quantity must not exceed available stock
- Inventory is automatically decremented

### 2. Get Order History
Retrieves all orders for the logged-in user.

**Request:**
```bash
curl -X GET http://localhost:5000/api/order/history \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "607f1f77bcf86cd799439100",
      "user_id": "507f1f77bcf86cd799439011",
      "items": [
        {
          "product_id": "507f1f77bcf86cd799439012",
          "product_name": "Margherita Pizza",
          "quantity": 2,
          "price": 12.99,
          "subtotal": 25.98
        }
      ],
      "total_amount": 25.98,
      "status": "Placed",
      "delivery_address": "123 Main Street...",
      "timestamp": "2024-12-07T10:05:00Z"
    }
  ],
  "count": 1
}
```

### 3. Get Order by ID
Retrieves a specific order.

**Request:**
```bash
curl -X GET "http://localhost:5000/api/order/607f1f77bcf86cd799439100" \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "607f1f77bcf86cd799439100",
    "user_id": "507f1f77bcf86cd799439011",
    "items": [...],
    "total_amount": 25.98,
    "status": "Placed",
    "timestamp": "2024-12-07T10:05:00Z"
  }
}
```

**Note:** Users can only view their own orders. Admins can view any order.

### 4. Update Order Status (Admin Only)
Updates the status of an order.

**Request:**
```bash
curl -X PUT "http://localhost:5000/api/order/607f1f77bcf86cd799439100" \
  -H "x-api-key: slice_chill_api_key_change_in_production" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Delivered"
  }'
```

**Valid Statuses:**
- `Placed` - Initial status
- `Processing` - Order being prepared
- `Delivered` - Order delivered
- `Cancelled` - Order cancelled

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439100",
    "status": "Delivered",
    "updatedAt": "2024-12-07T10:10:00Z"
  }
}
```

## Error Responses

### Missing API Key
```json
{
  "success": false,
  "message": "Missing x-api-key header"
}
```

### Invalid API Key
```json
{
  "success": false,
  "message": "Invalid API key"
}
```

### Unauthorized (Invalid Token)
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Username, email, and password are required"
}
```

### Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### Conflict (Duplicate)
```json
{
  "success": false,
  "message": "User already exists with this email or username"
}
```

### Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Testing Workflow

### Complete User Journey

1. **Sign Up**
   ```bash
   curl -X POST http://localhost:5000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"customer1","email":"customer@example.com","password":"Pass123456"}'
   ```

2. **Login and Save Token**
   ```bash
   TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"customer@example.com","password":"Pass123456"}' \
     | jq -r '.token')
   
   echo $TOKEN
   ```

3. **Get All Products**
   ```bash
   curl -X GET http://localhost:5000/api/menu \
     -H "x-api-key: slice_chill_api_key_change_in_production"
   ```

4. **Get Pizza Products**
   ```bash
   curl -X GET http://localhost:5000/api/menu/category/Pizza \
     -H "x-api-key: slice_chill_api_key_change_in_production"
   ```

5. **Place Order** (replace with actual product ID)
   ```bash
   curl -X POST http://localhost:5000/api/order \
     -H "x-api-key: slice_chill_api_key_change_in_production" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"items":[{"product_id":"YOUR_PRODUCT_ID","quantity":2}],"delivery_address":"123 Test St"}'
   ```

6. **Get Order History**
   ```bash
   curl -X GET http://localhost:5000/api/order/history \
     -H "x-api-key: slice_chill_api_key_change_in_production" \
     -H "Authorization: Bearer $TOKEN"
   ```

## Tools for Testing

### Postman
- Import API collection
- Set up environment variables
- Save requests and responses

### cURL
- Command-line testing
- Good for scripting
- Basic but powerful

### REST Client (VS Code Extension)
- Create `.http` files with requests
- Easy syntax
- Quick testing

### Insomnia
- User-friendly GUI
- Request history
- Team collaboration

## Tips

1. **Save API Key as variable** to avoid repetition
2. **Use pretty-print** JSON: `| jq` (requires jq)
3. **Test error cases** to understand error messages
4. **Check timestamps** for order history
5. **Verify inventory** changes after orders
6. **Monitor logs** in backend terminal
7. **Use Authorization header** for protected routes
8. **Include Content-Type header** for POST/PUT requests

---

For more information, see the main [README.md](../README.md)
