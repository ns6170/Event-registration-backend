const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../repositories/authRepo');

async function signup(req, res, next) {
    try {
        const { username, email, password } = req.body;
        if (await getUserByEmail(email)) return res.status(409).json({ error: 'Email taken' });
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await createUser({ username, email, passwordHash });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(201).json({ user, token });
    } catch (err) { next(err) }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
    } catch (err) { next(err) }
}

module.exports = { signup, login };
