const express = require('express');

const configureMiddlewar = require('./middleware/middleware.js');
const projectsRouter = require('./projectsRouter.js');
const actionsRouter = require('./actionsRouter.js');

const server = express();

configureMiddlewar(server);

//routes
server.use('/projects', projectsRouter);


module.exports = server;