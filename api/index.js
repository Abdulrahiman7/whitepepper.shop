const express = require('express');
const { registerRoutes } = require('../server/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all your routes
registerRoutes(app);

module.exports = app;
