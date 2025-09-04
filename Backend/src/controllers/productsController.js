import {
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    getProductCategories as getProductCategoriesService,
    getProductsByCategoryName as getProductsByCategoryNameService,
    createProduct as createProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
};

export const getProductCategories = async (req, res) => {
    try {
        const categories = await getProductCategoriesService();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

export const getProductsByCategoryName = async (req, res) => {
    try {
        const products = await getProductsByCategoryNameService(req.params.name);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products by category" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await createProductService(req.body)
        res.json(newProduct)
    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error)
        res.status(500).json({ message: "Error adding new product" })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const newInfo = req.body;
        const updatedProduct = await updateProductService(id, newInfo);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product information" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await deleteProductService(req.params.id);
        res.json(deletedProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" })
    }
}