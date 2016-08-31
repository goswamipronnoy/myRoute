'use strict';

const Hapi = require('hapi'),
    mongojs = require('mongojs');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000,
});

// Connect to db
server.app.db = mongojs('mongodb://localhost:3000/todos', ['todos']);

//Loading plugins
server.register([
    require('./routes/todos')
], function (err) {
    if (err) {
        throw err;
    }
    server.start(function (err) {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
});

