import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "nodeuser",
    password: process.env.DB_PASSWORD || "nodepassword",
    database: process.env.DB_NAME || "online_store_db",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

export async function getAllProducts() {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM products");
    await connection.end();
    return rows;
}

export async function getProductById(id) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM products WHERE id = ?", [id]);
    await connection.end();
    return rows[0];
}

export async function getProductCategories() {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT DISTINCT category FROM products");
    await connection.end();
    return rows.map(r => r.category);
}

export async function getProductsByCategoryName(category) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM products WHERE category = ?", [category]);
    await connection.end();
    return rows;
}

export async function createProduct(newProduct) {
    const connection = await mysql.createConnection(dbConfig);

    const sql = `
        INSERT INTO products (title, description, price, category, stock, brand, discount, rating, thumbnail, images) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        newProduct.title,
        newProduct.description,
        newProduct.price,
        newProduct.category,
        newProduct.stock,
        newProduct.brand,
        newProduct.discount || null,
        newProduct.rating || null,
        newProduct.thumbnail || null,
        newProduct.images ? JSON.stringify(newProduct.images) : null
    ];

    const [result] = await connection.execute(sql, values);
    await connection.end();
    return result.insertId;
}

export async function updateProduct(id, updates) {
    const connection = await mysql.createConnection(dbConfig);

    const sql = `
        UPDATE products 
        SET title = ?, description = ?, price = ?, category = ?, stock = ?, brand = ?, discount = ?, rating = ?, thumbnail = ?, images = ?
        WHERE id = ?
    `;

    const values = [
        updates.title,
        updates.description,
        updates.price,
        updates.category,
        updates.stock,
        updates.brand,
        updates.discount || null,
        updates.rating || null,
        updates.thumbnail || null,
        updates.images ? JSON.stringify(updates.images) : null,
        id
    ];

    const [result] = await connection.execute(sql, values);
    await connection.end();

    return result.affectedRows > 0
        ? "Successfully updated product"
        : "No product found with that id";
}

export async function deleteProduct(id) {
    const connection = await mysql.createConnection(dbConfig)
    const sql = `
        DELETE FROM products 
        WHERE id = ?
    `
    const [result] = await connection.execute(sql, [id])

    return result.affectedRows > 0
        ? `Successfully deleted product with id: ${id}`
        : "No product found with that id"
}