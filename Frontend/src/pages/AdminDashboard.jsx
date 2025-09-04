import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAllProducts, updateProduct, deleteProduct } from "../api/productApi";
import "../styles/pageStyles/AdminDashboard.css";

const AdminDashboard = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({ title: "", price: 0, stock: 0 });

    if (!token) return <Navigate to="/login" />;
    if (!user || user.role !== "admin") return <Navigate to="/" />;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(id, token);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete product");
        }
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditValues({ title: product.title, price: product.price, stock: product.stock });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({ title: "", price: 0, stock: 0 });
    };

    const saveEdit = async (id) => {
        try {
            const updated = await updateProduct(id, editValues, token);
            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
            cancelEdit();
        } catch (err) {
            console.error(err);
            alert("Failed to update product");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value }));
    };

    if (loading) return <p className="loading">Loading products...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <p className="welcome-text">
                Welcome, {user.username}. You can manage products here.
            </p>

            <div className="products-table">
                <div className="table-header">
                    <span>ID</span>
                    <span>Title</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span>Actions</span>
                </div>

                {products.map((product) => (
                    <div className="table-row" key={product.id}>
                        <span>{product.id}</span>
                        <span>
                            {editingId === product.id ? (
                                <input
                                    type="text"
                                    name="title"
                                    value={editValues.title}
                                    onChange={handleChange}
                                />
                            ) : (
                                product.title
                            )}
                        </span>
                        <span>
                            {editingId === product.id ? (
                                <input
                                    type="number"
                                    name="price"
                                    value={editValues.price}
                                    onChange={handleChange}
                                />
                            ) : (
                                `$${product.price}`
                            )}
                        </span>
                        <span>
                            {editingId === product.id ? (
                                <input
                                    type="number"
                                    name="stock"
                                    value={editValues.stock}
                                    onChange={handleChange}
                                />
                            ) : (
                                product.stock
                            )}
                        </span>
                        <span>
                            {editingId === product.id ? (
                                <>
                                    <button className="save-btn" onClick={() => saveEdit(product.id)}>Save</button>
                                    <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className="edit-btn" onClick={() => startEdit(product)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                                </>
                            )}
                        </span>
                    </div>
                ))}

                {products.length === 0 && <p>No products found.</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
