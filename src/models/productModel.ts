const db = require("../config/db")

export const createProduct = async (userId: number, categoryId: number, title: string, description: string, price: number) => {
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

export const findProductById = async (id: number) => {
    const [rows] = await db.query(
        'SELECT * FROM products WHERE id = ?', [id]
    );
    return rows[0];
};

export const updateProduct = async (id: number, title: string, description: string, price: number, status: string) => {
    const [result] = await db.query(
        'UPDATE products SET title = ?, description = ?, price = ?, status = ? , updated_ad = NOW() WHERE id =?',
        [title, description, price, status, id]
    );
    return result;
};

const deleteProduct = async (id:number) => {
    const [result] = await db.query(
        'DELETE FROM products WHERE id = ?', [id]
    );
    return result;
};
