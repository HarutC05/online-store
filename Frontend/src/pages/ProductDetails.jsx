import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { CartContext } from "../context/CartContext";

import "../styles/pageStyles/ProductDetails.css";

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const productData = await getProductById(id);
                setProduct(productData);
                setImages(productData.images || []);
            } catch (error) {
                console.error("Failed to fetch product: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            getProduct();
        }
    }, [id]);

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (loading) return <p className="loading">Loading product...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!product) return <p className="error">Product not found</p>;

    return (
        <div className="product-details">
            <div className="details-left">
                <div className="image-slider">
                    {images.length > 0 && (
                        <img
                            src={images[currentImageIndex]}
                            alt={`Image of ${product.title}`}
                            className="main-image"
                        />
                    )}

                    {images.length > 1 && (
                        <>
                            <button className="slider-btn prev" onClick={goToPrevious}>
                                ❮
                            </button>
                            <button className="slider-btn next" onClick={goToNext}>
                                ❯
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="details-right">
                <h2 className="title">{product.title}</h2>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <p className="stock" style={{ color: product.stock > 0 ? "green" : "red" }}>
                    {product.stock > 0 ? "In Stock" : "Out of stock"}
                </p>
                <p className="rating">⭐ {product.rating} / 5.0</p>

                <div className="quantity-picker">
                    <label>Quantity: </label>
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>

                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

