import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

import "../styles/componentStyles/Navbar.css";
import burgerIcon from "../assets/menu/burger-bar.png";
import searchIcon from "../assets/search.png"
import shoppingCart from "../assets/shopping-cart.png"

export default function Navbar({ setIsDrawerOpen, setSearchTerm }) {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div
                    className="hamburger-menu-icon"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <img src={burgerIcon} alt="Menu" />
                </div>
                {user && <span className="welcome-message">Welcome {user.username}</span>}
            </div>

            <div className="navbar-center">
                <h1 id="page-title">
                    <Link to="/" id="homepage-link">My Store</Link>
                </h1>
            </div>

            <ul className="navbar-right">
                <div className="searchBar">
                    <input
                        type="text"
                        onChange={handleSearchTerm}
                        id="searchBar"
                        name="searchBar"
                        placeholder="Search..."
                    />
                    <img
                        src={searchIcon}
                        alt="search icon"
                        id="searchIcon" />
                </div>

                <li className="cart-link">
                    <Link to="/cart">
                        <img src={shoppingCart} alt="" />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                </li>

                {user && user.role === "admin" && (
                    <li><Link to="/admin">Admin Panel</Link></li>
                )}

                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}

                {user && (
                    <li><button className="logoutBtn" onClick={logout}>Logout</button></li>
                )}
            </ul>
        </nav>
    );
}
