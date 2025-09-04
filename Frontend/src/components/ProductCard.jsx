import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
    };

    return (
        <Link to={`/products/${product.id}`} className="product-card-link">
            <div className="product-card">
                <img
                    src={product.thumbnail}
                    alt={`Thumbnail image of product: ${product.title}`}
                />
                <div className="top">
                    <div className="top-portion">
                        <p style={{ color: product.stock > 0 ? "green" : "red" }}>
                            {product.stock > 0 ? "In Stock" : "Out of stock"}
                        </p>
                        <p>⭐️ {product.rating} / 5.0</p>
                    </div>
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                </div>
                <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
}
