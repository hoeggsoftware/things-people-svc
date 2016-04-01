(function () {
    'use strict';
    const Hapi = require('hapi');
    const Boom = require('boom');

    var config = require('./config');
    var logger = require('bucker').createLogger({ console: true }, config.api_name);

    var server = new Hapi.Server({
        connections: {
            routes: {
                cors: true
            }
        }
    });
    server.connection({
        host: config.host,
        port: config.port,
        router: {
            isCaseSensitive: false
        }
    });


    /* function declarations */

    function errorReply(err, reply) {
        if (err.statusCode === 404) {
            logger.error(err.statusCode + ' ' + err.error.message);
            return reply(Boom.notFound(err.error.message));
        }
        logger.error(err);
        return reply(Boom.internal(err.message));
    }

    function registerRoutes(server) {
        server.route({
            method: 'GET',
            path: '/_health',
            config: {
                handler: function (request, reply) {

                    return reply('OK');
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/people',
            config: {
                handler: function (request, reply) {
                    var json = require('./resources/people.json');
                    return reply(json);
                }
            }
        });
    }

    registerRoutes(server);

    server.start(function (err) {
        if (err) {
            throw err;
        }
        logger.info('Initialised api ' + config.api_name + ' at ' + server.info.uri);
    });

    module.exports = server;
}());