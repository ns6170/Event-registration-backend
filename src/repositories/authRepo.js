const pool = require('../config/db');
async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
}
async function createUser({ username, email, passwordHash }) {
    const [result] = await pool.query(
        'INSERT INTO Users (username,email,password_hash) VALUES (?,?,?)',
        [username, email, passwordHash]
    );
    return { id: result.insertId, username, email };
}
module.exports = { getUserByEmail, createUser };
