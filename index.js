'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('I am awesome!!!');
    }
});

server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});