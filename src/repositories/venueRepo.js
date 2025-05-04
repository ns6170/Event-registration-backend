const pool = require('../config/db');

async function getAllVenues() {
    const [rows] = await pool.query('SELECT * FROM Venues');
    return rows;
}

async function getVenueById(id) {
    const [rows] = await pool.query('SELECT * FROM Venues WHERE id = ?', [id]);
    return rows[0];
}

async function createVenue({ name, address, capacity }) {
    const [result] = await pool.query(
        'INSERT INTO Venues (name,address,capacity) VALUES (?,?,?)',
        [name, address, capacity]
    );
    return { id: result.insertId, name, address, capacity };
}

async function updateVenue(id, fields) {
    const sets = Object.keys(fields).map(k => `\`${k}\` = ?`).join(',');
    const vals = [...Object.values(fields), id];
    await pool.query(`UPDATE Venues SET ${sets} WHERE id = ?`, vals);
}

async function deleteVenue(id) {
    await pool.query('DELETE FROM Venues WHERE id = ?', [id]);
}

module.exports = {
    getAllVenues,
    getVenueById,
    createVenue,
    updateVenue,
    deleteVenue
};
