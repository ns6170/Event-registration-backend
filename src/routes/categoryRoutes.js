const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');

router.use(auth);            // protect all category endpoints

// POST   /api/categories      → create a new category
router.post('/', ctrl.create);

// DELETE /api/categories/:id  → delete category by ID
router.delete('/:id', ctrl.remove);

module.exports = router;
