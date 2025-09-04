import express from "express"
import {
    createUser,
    getUserByEmail,
    validateUser,
    generateJWT,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userControllers.js";

import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", validateUser);

router.get("/users/email", requireAuth, getUserByEmail);
router.get("/users/:id", requireAuth, getUserById);
router.put("/users/:id", requireAuth, updateUser);

router.delete("/users/:id", requireAuth, requireAdmin, deleteUser);

router.post("/users/token", generateJWT);

export default router;