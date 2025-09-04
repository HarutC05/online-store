import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "nodeuser",
    password: process.env.DB_PASSWORD || "nodepassword",
    database: process.env.DB_NAME || "online_store_db",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

export const jwtSecret = process.env.JWT_SECRET;
export const port = process.env.PORT || 5000;
