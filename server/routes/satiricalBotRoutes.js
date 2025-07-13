const express = require('express');
const router = express.Router();
const satiricalBotController = require('../controllers/satiricalBotController');

router.post('/satirical-bot', satiricalBotController.postSatiricalBot);
router.post('/satirical-bot-1', satiricalBotController.postSatiricalBot1);

module.exports = router;
