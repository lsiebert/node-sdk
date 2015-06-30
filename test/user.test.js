'use strict';
var Bluebird = require('bluebird');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Appsaholic User', function() {
    var Session = require('../').Session;
    var User = require('../').User;
    var session;

    beforeEach(function() {
        session = new Session('1fef164ff8c6a023fbf005c6e12c5df81832935a', 'ea92a01fb2865f4980d2348723dd916a32a9e5ba', 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
        sinon.stub(session, 'request');
    });

    it('builds paths correctly', function() {
        var user = new User(session);

        expect(user.buildPath()).to.equal(user.basePath + '/' + session.userId + '.json');
    });

    it('gets user information', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    user: {
                        id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a',
                        email: 'test@appsaholic.com',
                        first_name: 'Appsaholic',
                        last_name: 'Test',
                        available_points: 9000,
                        pending_points: 1
                    }
                }
            }
        }));
        var user= new User(session);
        user.getInformation().then(function(user) {
            sinon.assert.calledWith(session.request, 'get', '/v1/users/' + session.userId + '.json');

            expect(user.id).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
            expect(user.email).to.equal('test@appsaholic.com');
            expect(user.first_name).to.equal('Appsaholic');
            expect(user.last_name).to.equal('Test');
            expect(user.available_points).to.equal(9000);
            expect(user.pending_points).to.equal(1);

            done();
        });
    });
});