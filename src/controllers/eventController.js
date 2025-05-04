const repo = require('../repositories/eventRepo');

async function list(req, res, next) {
    try {
        const events = await repo.getAllEvents();
        res.json(events);
    } catch (err) { next(err) }
}

// async function getOne(req, res, next) {
//     try {
//         const evt = await repo.getEventById(req.params.id);
//         if (!evt) return res.sendStatus(404);
//         res.json(evt);
//     } catch (err) { next(err) }
// }

async function create(req, res, next) {
    try {

        const organizer_id = req.user.id;


        const { title, description, event_date, venue_id } = req.body;

        const evt = await repo.createEvent({
            title,
            description,
            event_date,
            organizer_id,
            venue_id
        });

        res.status(201).json(evt);
    } catch (err) {
        next(err);
    }
}


async function update(req, res, next) {
    try {
        await repo.updateEvent(req.params.id, req.body);
        res.sendStatus(204);
    } catch (err) { next(err) }
}

async function remove(req, res, next) {
    try {
        await repo.deleteEvent(req.params.id);
        res.sendStatus(204);
    } catch (err) { next(err) }
}

async function getOne(req, res, next) {
    try {
        const id = Number(req.params.id);
        const evt = await repo.getEventById(id);
        if (!evt) return res.sendStatus(404);

        const summary = await repo.getEventSummary(id);
        res.json({
            ...evt,
            max_capacity: summary.max_capacity,
            registered_count: summary.registered_count
        });
    } catch (err) {
        next(err);
    }
}


module.exports = { list, create, update, remove, getOne };
