'use strict';

const Hapi = require('hapi'),
    Joi = require('joi'),
    names = require('./retrieve-name');

const server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/names',
    handler: function (request, reply) {
        const result = names();
        reply(result);
    }
});

server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});