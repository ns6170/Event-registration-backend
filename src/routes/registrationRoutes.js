const router = require('express').Router({ mergeParams: true });
const ctrl = require('../controllers/registrationController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', ctrl.listRegistrations);
// GET   /api/events/:eventId/registrations/count
router.get('/count', ctrl.countRegistrations);

// POST  /api/events/:eventId/registrations
router.post('/', ctrl.register);

// DELETE /api/events/:eventId/registrations/:registrationId
router.delete('/', ctrl.cancel);


module.exports = router;
