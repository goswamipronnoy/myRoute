'use strict';

const Hapi = require('hapi'),
    Joi = require('joi'),
    mongojs = require('mongojs'),
    todos = require('./routes/todos');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000,
});

// Connect to db
server.app.db = mongojs('hapi-rest-mongo', ['todos']);

// todo homepage api call
server.route({
    method: 'GET',
    path: '/todos',
    handler: function (request, reply) {
        const result = todos();
        reply(result);
    }
});

server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});