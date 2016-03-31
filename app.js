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
                auth: false,
                handler: function (request, reply) {

                    return reply('OK');
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