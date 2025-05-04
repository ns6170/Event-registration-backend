const router = require('express').Router();
const ctrl = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

router.use(auth);                // protect all endpoints below
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
