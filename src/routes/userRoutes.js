const express = require('express');
const ctrl = require('../controllers/userController');
const router = express.Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

module.exports = router;
