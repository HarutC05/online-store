import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminDashboard";
import CategoryDrawerMenu from "./components/CategoryDrawerMenu.jsx";
import ScrollToTop from './components/ScrollToTop.jsx'

import "./styles/App.css";

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate();

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setIsDrawerOpen(false);
    navigate("/");
  };

  const drawerSections = {
    Fashion: ["mens-shirts", "mens-shoes", "mens-watches"],
    Electronics: ["laptops", "mobile-accessories"],
    Home: ["furniture", "home-decoration", "kitchen-accessories", "groceries"],
    Beauty: ["beauty", "fragrances"],
  };

  return (
    <div className="App">
      <Navbar
        setIsDrawerOpen={setIsDrawerOpen}
        setSearchTerm={setSearchTerm}
      />

      {isDrawerOpen && (
        <CategoryDrawerMenu
          sections={drawerSections}
          onSelectCategory={handleSelectCategory}
          closeDrawer={() => setIsDrawerOpen(false)}
        />
      )}

      <div className="page-content">
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                searchTerm={searchTerm}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}