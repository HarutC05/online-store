import { useState, useEffect } from "react";
import { getAllProducts, getProductCategories } from "../api/productApi";

import CategorySidebarMenu from "../components/CategorySidebarMenu.jsx";
import ProductCard from "../components/ProductCard.jsx";

import Pagination from "../components/Pagination.jsx";

import "../styles/componentStyles/ProductGrid.css";
import "../styles/pageStyles/Home.css";

export default function Home({ selectedCategory, onSelectCategory, searchTerm }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 20

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    getAllProducts(),
                    getProductCategories(),
                ]);

                setProducts(productsRes || []);
                setFilteredProducts(productsRes || []);
                setCategories(["All", ...(categoriesRes || [])]);
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm && searchTerm.trim().length > 0) {
            const term = searchTerm.toLowerCase()
            setFilteredProducts(products.filter(
                p => p.category.toLowerCase().includes(term) ||
                    p.title.toLowerCase().includes(term)
            ));
        } else if (selectedCategory === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(
                (p) => p.category === selectedCategory));
        }

        setCurrentPage(1)
    }, [selectedCategory, products, searchTerm]);

    const lastProductIndex = currentPage * productsPerPage
    const firstProductIndex = lastProductIndex - productsPerPage
    const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex)

    return (
        <div className="home-page">
            <div className="home-content">
                {Array.isArray(categories) && (
                    <CategorySidebarMenu
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={onSelectCategory}
                    />
                )}

                <div className="product-grid">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading &&
                        !error &&
                        Array.isArray(filteredProducts) &&
                        currentProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                    {!loading && !error && filteredProducts.length === 0 && (
                        <p>No products found</p>
                    )}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                filteredProducts={filteredProducts}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}