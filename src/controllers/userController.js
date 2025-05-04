const repo = require('../repositories/userRepo');

async function list(req, res, next) {
    try {
        const users = await repo.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const user = await repo.getUserById(req.params.id);
        if (!user) return res.sendStatus(404);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = { list, getById };
