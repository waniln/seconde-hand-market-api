const db = require('../config/db');

const findByEmail = async (email) => {
    const [ rows ] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (email, password, nickname) => {
    const [result] = await db.query(
        'INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)', 
        [email, password, nickname]
    );
    return result;
};

module.exports = { findByEmail, createUser };