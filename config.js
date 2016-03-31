(function(){
    'use strict';

    const Ip = require('ip');
    /* standard configuration */

    var config = {
        environment: process.env.NODE_ENV || 'dev',
        host: Ip.address() || 'localhost',
        port: process.env.PORT || 8001
    };

    config.api_name = 'things-svc';

    module.exports = config;
}());