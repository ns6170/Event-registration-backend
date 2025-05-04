const repo = require('../repositories/categoryRepo');

async function create(req, res, next) {
    try {
        const { name, description } = req.body;
        const category = await repo.createCategory({ name, description });
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        await repo.deleteCategory(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

module.exports = { create, remove };
