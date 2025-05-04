const repo = require('../repositories/venueRepo');

async function list(req, res, next) {
    try {
        res.json(await repo.getAllVenues());
    } catch (err) { next(err) }
}

async function getOne(req, res, next) {
    try {
        const v = await repo.getVenueById(req.params.id);
        if (!v) return res.sendStatus(404);
        res.json(v);
    } catch (err) { next(err) }
}

async function create(req, res, next) {
    try {
        console.log(req.body);
        const venue = await repo.createVenue(req.body);
        res.status(201).json(venue);
    } catch (err) { next(err) }
}


async function update(req, res, next) {
    try {
        await repo.updateVenue(req.params.id, req.body);
        res.sendStatus(204);
    } catch (err) { next(err) }
}

async function remove(req, res, next) {
    try {
        await repo.deleteVenue(req.params.id);
        res.sendStatus(204);
    } catch (err) { next(err) }
}

module.exports = { list, getOne, create, update, remove };
