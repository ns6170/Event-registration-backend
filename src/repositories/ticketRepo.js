const pool = require('../config/db');

async function createTicket({ registration_id, ticket_type, price }) {
    const [result] = await pool.query(
        'INSERT INTO Tickets (registration_id, ticket_type, price) VALUES (?,?,?)',
        [registration_id, ticket_type, price]
    );
    return { id: result.insertId, registration_id, ticket_type, price };
}

module.exports = { createTicket };