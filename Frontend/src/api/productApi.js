import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

function handleApiError(error, defaultMessage) {
    if (error.response && error.response.data) throw error.response.data;
    throw { message: error.message || defaultMessage };
}

export async function getAllProducts() {
    try {
        const res = await axios.get(`${BASE_URL}`);
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to get products");
    }
}

export async function getProductById(id) {
    try {
        const res = await axios.get(`${BASE_URL}/${id}`);
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to get product with that id");
    }
}

export async function getProductCategories() {
    try {
        const res = await axios.get(`${BASE_URL}/categories`);
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to get product categories");
    }
}

export async function getProductsByCategoryName(category) {
    try {
        const res = await axios.get(`${BASE_URL}/category/${encodeURIComponent(category)}`);
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to get that category");
    }
}

export async function updateProduct(id, newInfo, token) {
    try {
        const res = await axios.put(`${BASE_URL}/${id}`, newInfo, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to update product");
    }
}

export async function deleteProduct(id, token) {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to delete product");
    }
}
