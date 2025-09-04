import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Backend is working!" });
});

export default app;