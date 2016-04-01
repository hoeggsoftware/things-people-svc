(function () {
    'use strict';

    var expect = require('chai').expect;

    var config, api, people;

    before(function (done) {

        config = require('../config.js');
        api = require('../app.js');
        people = require('../resources/people.json').people;
        done();
    });

    after(function (done) {
        done();
    });

    describe('Functional Tests', function () {
        describe('Get Health Route', function () {

            it('should return OK', function (done) {
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
        describe('Get People', function () {
            it('returns the json', function (done) {
                this.timeout(1000);
                var req = {
                    method: 'GET',
                    url: '/people'
                };

                api.inject(req, function (res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.result.people).to.not.be.undefined;
                    expect(res.result.people.length).to.equal(people.length);
                    done();
                });
            });
        });

    });
}());