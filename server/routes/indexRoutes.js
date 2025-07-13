const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getRoot);
router.get('/health', indexController.getHealth);

module.exports = router;
