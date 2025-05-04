const router = require('express').Router();
const ctrl = require('../controllers/venueController');
const auth = require('../middleware/authMiddleware');

router.use(auth);           // protect all venue endpoints
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
