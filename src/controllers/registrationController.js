const regRepo = require('../repositories/registrationRepo');
const ticketRepo = require('../repositories/ticketRepo');
const eventRepo = require('../repositories/eventRepo');
const venueRepo = require('../repositories/venueRepo');



async function register(req, res, next) {
    try {
        const eventId = Number(req.params.eventId);
        const userId = req.user.id;
        const ticketType = req.body.ticketType || 'general';
        const price = req.body.price || 0;

        // delegate everything to the repo
        const { registration_id, ticket_id } = await regRepo.registerForEvent({
            eventId,
            userId,
            ticketType,
            price,
        });

        // return the new IDs
        res.status(201).json({
            registration: { id: registration_id },
            ticket: { id: ticket_id }
        });
    } catch (err) {
        // catch your SIGNAL’d errors as bad requests
        if (err.errno === 1644 /* SQLSTATE 45000 */) {
            return res.status(400).json({ error: err.sqlMessage });
        }
        next(err);
    }
}


async function cancel(req, res, next) {
    try {
        const eventId = Number(req.params.eventId);
        const userId = req.user.id;
        // find their registration
        const reg = await regRepo.getRegistrationByEventAndUser(eventId, userId);
        if (!reg) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        await regRepo.deleteRegistration(reg.id);
    } catch (err) {
        next(err);
    }
}

async function countRegistrations(req, res, next) {
    try {
        const eventId = Number(req.params.eventId);
        const count = await regRepo.countRegistrations(eventId);
        res.json({ count });
    } catch (err) {
        next(err);
    }
}

async function listRegistrations(req, res, next) {
    try {
        const eventId = Number(req.params.eventId);
        const regs = await regRepo.getRegistrationsByEvent(eventId);
        res.json(regs);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    cancel,
    countRegistrations,    // from earlier
    listRegistrations,     // ← new
}

