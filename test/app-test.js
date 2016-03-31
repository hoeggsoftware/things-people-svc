(function () {
    'use strict';

    var expect = require('chai').expect;

    var config, api;

    before(function (done) {
        this.timeout(0);

        config = require('../config.js');
        api = require('../app.js');
        done();
    });

    after(function (done) {
        done();
    });

    describe('Functional Tests', function () {
        describe('Get Health Route', function () {

            it('should return OK', function (done) {
                this.timeout(0);
                var req = {
                    method: 'GET',
                    url: '/_health'
                };

                api.inject(req, function (res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });


    });
}());