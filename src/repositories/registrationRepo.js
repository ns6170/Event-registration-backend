const pool = require('../config/db');

async function countRegistrations(eventId) {
    const [[{ count }]] = await pool.query(
        'SELECT COUNT(*) AS count FROM Registrations WHERE event_id = ?',
        [eventId]
    );
    return count;
}

async function getRegistrationByEventAndUser(eventId, userId) {
    const [[row]] = await pool.query(
        'SELECT * FROM Registrations WHERE event_id = ? AND user_id = ?',
        [eventId, userId]
    );
    return row;
}

async function createRegistration({ event_id, user_id, status }) {
    const [result] = await pool.query(
        'INSERT INTO Registrations (event_id, user_id, status) VALUES (?,?,?)',
        [event_id, user_id, status]
    );
    return { id: result.insertId, event_id, user_id, status };
}

async function deleteRegistration(id) {
    await pool.query('DELETE FROM Registrations WHERE id = ?', [id]);
}

async function getRegistrationsByEvent(eventId) {
    const sql = `
    SELECT 
      r.id            AS registration_id,
      r.status,
      u.id            AS user_id,
      u.username,
      u.email,
      t.id            AS ticket_id,
      t.ticket_type,
      t.price
    FROM Registrations r
    JOIN Users u   ON r.user_id = u.id
    LEFT JOIN Tickets t ON t.registration_id = r.id
    WHERE r.event_id = ?
    ORDER BY r.registration_date DESC
  `;
    const [rows] = await pool.query(sql, [eventId]);
    return rows;
}

// ← NEW: calls your stored procedure and returns the two new IDs
async function registerForEvent({ eventId, userId, ticketType = 'general', price = 0 }) {
    // 1) CALL the SP
    await pool.query(
        'CALL sp_register_event(?, ?, ?, ?, @p_registration_id, @p_ticket_id)',
        [eventId, userId, ticketType, price]
    );
    // 2) READ back the OUT params
    const [[outs]] = await pool.query(
        'SELECT @p_registration_id AS registration_id, @p_ticket_id AS ticket_id'
    );
    return { registration_id: outs.registration_id, ticket_id: outs.ticket_id };
}

module.exports = {
    countRegistrations,
    createRegistration,
    deleteRegistration,
    getRegistrationsByEvent,
    getRegistrationByEventAndUser,
    registerForEvent,    // ← export it
};
