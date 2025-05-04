const pool = require('../config/db');

async function createCategory({ name, description }) {
    const [result] = await pool.query(
        'INSERT INTO Categories (name, description) VALUES (?,?)',
        [name, description]
    );
    return { id: result.insertId, name, description };
}

async function deleteCategory(id) {
    await pool.query('DELETE FROM Categories WHERE id = ?', [id]);
}

module.exports = { createCategory, deleteCategory };
