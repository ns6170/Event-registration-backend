const pool = require('../config/db');

async function assignCategory(eventId, categoryId) {
    await pool.query(
        'INSERT IGNORE INTO Event_Categories (event_id, category_id) VALUES (?,?)',
        [eventId, categoryId]
    );
}

async function removeCategory(eventId, categoryId) {
    await pool.query(
        'DELETE FROM Event_Categories WHERE event_id = ? AND category_id = ?',
        [eventId, categoryId]
    );
}

async function getCategoriesForEvent(eventId) {
    const [rows] = await pool.query(
        `SELECT c.* 
       FROM Categories c
       JOIN Event_Categories ec ON c.id = ec.category_id
      WHERE ec.event_id = ?`,
        [eventId]
    );
    return rows;
}

module.exports = { assignCategory, removeCategory, getCategoriesForEvent };
