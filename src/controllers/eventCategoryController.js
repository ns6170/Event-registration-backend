const repo = require('../repositories/eventCategoryRepo');

async function list(req, res, next) {
    try {
        const categories = await repo.getCategoriesForEvent(req.params.eventId);
        res.json(categories);
    } catch (err) { next(err) }
}

async function assign(req, res, next) {
    try {
        const { categoryId } = req.body;
        await repo.assignCategory(req.params.eventId, categoryId);
        res.sendStatus(204);
    } catch (err) { next(err) }
}

async function unassign(req, res, next) {
    try {
        await repo.removeCategory(req.params.eventId, req.params.categoryId);
        res.sendStatus(204);
    } catch (err) { next(err) }
}

module.exports = { list, assign, unassign };
