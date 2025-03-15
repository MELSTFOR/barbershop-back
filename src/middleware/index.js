const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const middleware = express.Router();

// Logging middleware
middleware.use(morgan('dev'));

// Security middleware
middleware.use(helmet());

// Add more middleware functions as needed

module.exports = middleware;