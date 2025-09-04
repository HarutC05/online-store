import mysql from "mysql2/promise";
import axios from "axios";

import { dbConfig } from "./config.js";

const db = await mysql.createConnection(dbConfig);


const response = await axios.get("https://dummyjson.com/products?limit=100");
const products = response.data.products;
console.log(products.length);

for (const product of products) {
    const {
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images
    } = product;

    await db.execute(
        `INSERT INTO products 
    (id, title, description, price, discount, rating, stock, brand, category, thumbnail, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      title = VALUES(title),
      description = VALUES(description),
      price = VALUES(price),
      discount = VALUES(discount),
      rating = VALUES(rating),
      stock = VALUES(stock),
      brand = VALUES(brand),
      category = VALUES(category),
      thumbnail = VALUES(thumbnail),
      images = VALUES(images)`,
        [
            id ?? null,
            title ?? null,
            description ?? null,
            price ?? null,
            discountPercentage ?? null,
            rating ?? null,
            stock ?? null,
            brand ?? null,
            category ?? null,
            thumbnail ?? null,
            images ? JSON.stringify(images) : null
        ]
    )
};

console.log("All products inserted successfully!");
process.exit(0); 
