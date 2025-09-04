import express from "express";
import {
    getAllProducts,
    getProductById,
    getProductCategories,
    getProductsByCategoryName,
    createProduct,
    updateProduct,
    deleteProduct

} from "../controllers/productsController.js";

const router = express.Router();

router.get("/products/categories", getProductCategories);
router.get("/products/category/:name", getProductsByCategoryName);
router.get("/products/:id", getProductById);
router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)


export default router;
