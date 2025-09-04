import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pageStyles/Cart.css";
import deleteImg from "../assets/trash.png";

export default function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <h2>Your Cart is Empty</h2>
                <Link to="/" className="back-home">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => addToCart(item, -1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => addToCart(item, 1)}
                                    disabled={item.quantity >= item.stock}
                                >
                                    +
                                </button>
                            </div>
                            <img
                                src={deleteImg}
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <p>Total: ${totalPrice.toFixed(2)}</p>
                <button
                    className="checkout-btn"
                    onClick={() => {
                        if (!user) {
                            alert("Please log in to checkout");
                            navigate("/login");
                        } else {
                            alert("Checkout functionality coming soon!");
                        }
                    }}
                >
                    Checkout
                </button>
                <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                </button>
            </div>
        </div>
    );
}
