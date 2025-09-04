🛒 Online Store








A fullstack e-commerce web app built with React, Node.js, Express, and MySQL.
Users can browse products, search or filter by category, add items to a cart, and authenticate via login/signup. Admins can manage products with a protected dashboard.

📌 Table of Contents

Features

Tech Stack

Project Structure

Installation & Setup

API Endpoints

Screenshots

Live Demo

Future Improvements

Author

🚀 Features
General

Browse all products with pagination

Filter products by category or search by name

Responsive design for desktop and mobile

Protected admin routes

User Features

Signup / Login / Logout

Shopping Cart:

Add products with quantity selection

Update quantity

Remove items

Clear cart

Checkout placeholder (alert message)

Persistent sessions via localStorage

Admin Features

Admin dashboard accessible only by users with admin role

Update & delete products

Product Details

Image slider for multiple product images

Title, price, description, stock status, and rating

Quantity selector with validation

Add to cart directly from product page

Navigation

Category sidebar & drawer menu for easy filtering

Navbar shows cart item count, search bar, and auth links

🛠️ Tech Stack

Frontend: React, React Router, Context API, Axios, CSS
Backend: Node.js, Express.js, JWT Authentication, Bcrypt
Database: MySQL
Dev Tools: Nodemon, Vite, Concurrently

📂 Project Structure
Frontend (frontend/src)
api/
 └─ productApi.js
 └─ userApi.js
components/
 └─ Navbar.jsx
 └─ Footer.jsx
 └─ ProductCard.jsx
 └─ Pagination.jsx
 └─ CategorySidebarMenu.jsx
 └─ CategoryDrawerMenu.jsx
 └─ ProtectedRoute.jsx
context/
 └─ AuthContext.jsx
 └─ CartContext.jsx
pages/
 └─ Home.jsx
 └─ ProductDetails.jsx
 └─ Login.jsx
 └─ Register.jsx
 └─ Cart.jsx
 └─ AdminDashboard.jsx
styles/
 └─ componentStyles/
 └─ pageStyles/
App.jsx
main.jsx

Backend (backend/)
routes/
 └─ auth.js
 └─ products.js
 └─ users.js
controllers/
 └─ authController.js
 └─ productController.js
 └─ userController.js
middleware/
 └─ authMiddleware.js
 └─ errorMiddleware.js
models/
 └─ db.js
server.js

💾 Installation & Setup
Prerequisites

Node.js & npm

MySQL

Backend
cd backend
npm install


Create .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=online_store
JWT_SECRET=your_jwt_secret


Start backend server:

npm run dev

Frontend
cd frontend
npm install
npm run dev


Visit the site at http://localhost:5173 (or Vite’s default port).

🌐 API Endpoints
Users

POST /api/users/register → Register new user

POST /api/users/login → Login

(Future: Admin-only user management)

Products

GET /api/products → All products

GET /api/products/:id → Single product

GET /api/products/categories → All categories

GET /api/products/category/:name → Products by category

PUT /api/products/:id → Update product (admin only)

DELETE /api/products/:id → Delete product (admin only)

📸 Screenshots

(Replace with your actual screenshots or GIFs)

Home Page


Product Details


Cart Page


Admin Dashboard


Optional: You can replace static screenshots with GIFs showing hover effects, image slider, or cart interactions for a professional touch.

🌍 Live Demo

👉 [Add your deployed link here]

⚡ Future Improvements

Full checkout & payment integration

Admin add product feature

Product sorting & filtering by price or rating

User profile management (update info, avatar)

Enhanced UI error handling & loading animations

💻 Author

Harut Gaspar
GitHub
