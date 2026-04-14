const db = require("../config/db")

const createProduct = async (userId, categoryId, title, description, price) => {
    const [result] = await db.query(
        'INSERT INTO products (user_id, category_id, title, description, price) VALUES (?, ?, ?, ?, ?)',
        [userId, categoryId, title, description, price]
    );
    return result.insertId;
};

const findAllProducts = async () => {
    const [rows] = await db.query(
        `SELECT * FROM products WHERE status = "판매중" ORDER BY created_at DESC`
    );
    return rows;
};

const findProductById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM products WHERE id = ?', [id]
    );
    return rows[0];
};

const updateProduct = async (id, title, description, price, status) => {
    const [result] = await db.query(
        'UPDATE products SET title = ?, description = ?, price = ?, status = ? , updated_ad = NOW() WHERE id =?',
        [title, description, price, status, id]
    );
    return result;
};

const deleteProduct = async (id) => {
    const [result] = await db.query(
        'DELETE FROM products WHERE id = ?', [id]
    );
    return result;
};

module.exports = { createProduct, findAllProducts, findProductById, updateProduct, deleteProduct };