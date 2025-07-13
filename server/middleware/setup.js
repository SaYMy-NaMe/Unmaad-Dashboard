const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

function setupMiddleware(app) {
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
}

module.exports = setupMiddleware;
