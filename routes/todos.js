'use strict';

const Boom = require('boom'),
 uuid = require('node-uuid'), 
 Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;

// get all todos from the database 
  server.route({  
    method: 'GET',
    path: '/todos',
    handler: function (request, reply) {
        db.todos.find(function (err, docs) {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }
            reply(docs);
        });
    }
});

// find a todo task by id
    server.route({  
        method: 'GET',
        path: '/todos/{id}',
        handler: function (request, reply) {
            db.todos.findOne({
                _id: request.params.id
            }, function (err, doc) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                if (!doc) {
                    return reply(Boom.notFound());
                }
                reply(doc);
            });
        }
    });

// create a new todo
    server.route({  
        method: 'POST',
        path: '/todos',
        handler: function (request, reply) {
            const book = request.payload;
            //Create an id
            book._id = uuid.v1();
            db.todos.save(book, function (err, result) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                reply(book);
            });
        },
        config: {
            validate: {
                payload: {
                    task: Joi.string().min(1).max(500).required(),
                }
            }
        }
    });

// update your todo
    server.route({  
        method: 'PATCH',
        path: '/todos/{id}',
        handler: function (request, reply) {
            db.todos.update({
                _id: request.params.id
            }, {
                $set: request.payload
            }, function (err, result) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                if (result.n === 0) {
                    return reply(Boom.notFound());
                }
                reply().code(204);
            });
        },
        config: {
            validate: {
                payload: Joi.object({
                    task: Joi.string().min(1).max(500).optional(),
                }).required().min(1)
            }
        }
    });

// delete your todo
    server.route({  
        method: 'DELETE',
        path: '/todos/{id}',
        handler: function (request, reply) {
            db.todos.remove({
                _id: request.params.id
            }, function (err, result) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                if (result.n === 0) {
                    return reply(Boom.notFound());
                }
                reply().code(204);
            });
        }
    });
    return next();
};

exports.register.attributes = {  
  name: 'routes-todo'
};