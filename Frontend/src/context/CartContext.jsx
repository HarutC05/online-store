// CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);

            let updatedCart;
            if (existingItem) {
                updatedCart = prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: Math.max(1, item.quantity + quantity) } // ✅ prevent going below 1
                        : item
                );
            } else {
                updatedCart = [...prev, { ...product, quantity }];
            }

            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((p) => p.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
