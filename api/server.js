const express = require('express');
const server = express();
const ActionsRouter = require('../api/actions/actions-router');
const ProjectsRouter = require('../api/projects/projects-router')

server.use(express.json());
server.use('/api/actions', ActionsRouter);
server.use('/api/projects', ProjectsRouter);

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use((error, req, res, next) => {
    error.error && console.error(error.error);
    res.status(error.status).json({message: error.message})
})

module.exports = server;
