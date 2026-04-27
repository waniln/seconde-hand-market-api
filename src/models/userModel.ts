const db = require('../config/db');

export const findByEmail = async (email: string) => {
    const [ rows ] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

export const createUser = async (email: string, password: string, nickname: string) => {
    const [result] = await db.query(
        'INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)', 
        [email, password, nickname]
    );
    return result;
};
