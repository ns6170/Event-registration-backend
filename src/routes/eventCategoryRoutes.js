const router = require('express').Router({ mergeParams: true });
const ctrl = require('../controllers/eventCategoryController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', ctrl.list);
router.post('/', ctrl.assign);
router.delete('/:categoryId', ctrl.unassign);

module.exports = router;
