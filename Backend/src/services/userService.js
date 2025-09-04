import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "nodeuser",
    password: process.env.DB_PASSWORD || "nodepassword",
    database: process.env.DB_NAME || "online_store_db",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

async function createDbConnection() {
    return await mysql.createConnection(dbConfig);
}

export async function createUser({ username, email, password, role = "user" }) {
    const connection = await createDbConnection();

    const [existingUser] = await connection.execute(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [username, email]
    );

    if (existingUser.length > 0) {
        throw new Error("User with that username or email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const values = [username, email, hashedPassword, role];
    const query = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await connection.execute(query, values);
    await connection.end();
    return result.insertId;
}

export async function getUserByEmail(email) {
    const connection = await createDbConnection();
    const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
    await connection.end();
    return rows[0];
}

export async function validateUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

export async function generateJWT(user) {
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
}

export async function getUserById(id) {
    const numericId = Number(id);
    if (!numericId || isNaN(numericId)) throw new Error("Invalid user id");

    const connection = await createDbConnection();
    const [rows] = await connection.execute("SELECT * FROM users WHERE id = ?", [numericId]);
    await connection.end();

    if (rows.length === 0) return null;
    const { password, ...userWithoutPassword } = rows[0];
    return userWithoutPassword;
}

export async function updateUser(id, updates) {
    const connection = await createDbConnection();
    if (!id || typeof id !== "number") throw new Error("Invalid user id");
    if (!updates.username && !updates.email && !updates.password) throw new Error("No valid fields to update");

    if (updates.username || updates.email) {
        const [existingUsers] = await connection.execute(
            "SELECT * FROM users WHERE (username = ? OR email = ?) AND id != ?",
            [updates.username || "", updates.email || "", id]
        );
        if (existingUsers.length > 0) throw new Error("Username or email already in use");
    }

    const fields = [];
    const values = [];

    if (updates.username) {
        fields.push("username = ?");
        values.push(updates.username);
    }

    if (updates.email) {
        fields.push("email = ?");
        values.push(updates.email);
    }

    if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updates.password, salt);
        fields.push("password = ?");
        values.push(hashedPassword);
    }

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);
    const [result] = await connection.execute(query, values);
    await connection.end();
    return result.affectedRows > 0;
}

export async function deleteUser(id, requestingUserId) {
    const connection = await createDbConnection();
    if (!id || typeof id !== "number") throw new Error("Invalid user id");

    const [rows] = await connection.execute("SELECT role FROM users WHERE id = ?", [requestingUserId]);
    if (rows.length === 0) throw new Error("Requesting user not found");
    if (rows[0].role !== "admin") throw new Error("Unauthorized: only admins can delete users");

    const [result] = await connection.execute("DELETE FROM users WHERE id = ?", [id]);
    await connection.end();
    return result.affectedRows > 0;
}
