const express = require('express');
const router = express.Router();
const lambdaController = require('../controllers/lambdaController');

router.get('/lambda', lambdaController.getLambda);

module.exports = router;
