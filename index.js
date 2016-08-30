'use strict';

const Hapi = require('hapi'),
    Joi = require('joi'),
    names = require('./retrieve-name');

const server = new Hapi.Server();
server.connection({port: 3000});

// let nameConfig = {
//     handler: function(request, reply) {
//         let names = request.params.name.split('/');
//         reply({
//             first: names[0],
//             last: names[1],
//             mood: request.query.mood
//         });
//     },
//     validate: {
//         params: {
//             name: Joi.string().min(8).max(100)
//         },
//         query: {
//             mood: Joi.string().valid(["neutral","happy","sad"]).default("neutral")
//         }
//     }
// };

// server.route({
//     method: 'GET',
//     path: '/name/{name*2}',
//     config: nameConfig
// });

// let names = [
//     {
//         id: 1,
//         name: 'Pronnoy Goswami'
//     },
//     {
//         id: 2,
//         name: 'Abhinav Dhasmana'
//     },
//     {
//         id: 3,
//         name: 'Mahesh Haldar',
//     }
// ];

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