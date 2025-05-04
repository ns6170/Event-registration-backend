const pool = require('../config/db');

async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM Users');
    return rows;
}

async function getUserById(id) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { getAllUsers, getUserById };
