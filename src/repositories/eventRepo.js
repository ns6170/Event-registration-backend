const pool = require('../config/db');

async function getAllEvents() {
    const [rows] = await pool.query('SELECT * FROM Events');
    return rows;
}

async function getEventById(id) {
    const [rows] = await pool.query('SELECT * FROM Events WHERE id = ?', [id]);
    return rows[0];
}

async function createEvent({ title, description, event_date, organizer_id, venue_id }) {
    const [result] = await pool.query(
        `INSERT INTO Events 
        (title, description, event_date, organizer_id, venue_id)
       VALUES (?,?,?,?,?)`,
        [title, description, event_date, organizer_id, venue_id]
    );
    return { id: result.insertId, title, description, event_date, organizer_id, venue_id };
}


async function updateEvent(id, fields) {
    const sets = Object.keys(fields).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(fields), id];
    await pool.query(`UPDATE Events SET ${sets} WHERE id = ?`, values);
}

async function deleteEvent(id) {
    await pool.query('DELETE FROM Events WHERE id = ?', [id]);
}

async function getEventSummary(eventId) {
    const [[row]] = await pool.query(
        'SELECT max_capacity, registered_count \
       FROM EventRegistrationSummary \
       WHERE event_id = ?',
        [eventId]
    );
    return row || { max_capacity: 0, registered_count: 0 };
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventSummary
};
