'use strict';
var Bluebird = require('bluebird');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Appsaholic Point', function() {
    var Session = require('../').Session;
    var Point = require('../').Point;
    var session;
    var points;

    beforeEach(function() {
        session = new Session('1fef164ff8c6a023fbf005c6e12c5df81832935a', 'ea92a01fb2865f4980d2348723dd916a32a9e5ba', 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
        sinon.stub(session, 'request');
        points = new Point(session);
    });

    it('builds paths correctly', function() {
        expect(points.buildPath()).to.equal(points.basePath + '.json');
        expect(points.buildPath('foo-bar-baz')).to.equal(points.basePath + '/foo-bar-baz.json');
    });

    it('awards points successfully', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    reference_id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a'
                }
            }
        }));

        points.add(5).then(function(referenceId) {
            sinon.assert.calledWith(session.request, 'post', '/v1/points.json', {points: 5, user_id: session.userId});

            expect(referenceId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');

            done();
        });
    });

    it('awards pending points successfully', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    reference_id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a'
                }
            }
        }));

        points.add(5, {pending: true}).then(function(referenceId) {
            sinon.assert.calledWith(session.request, 'post', '/v1/points.json', {points: 5, user_id: session.userId, pending: true});

            expect(referenceId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');

            done();
        });
    });

    it('releases pending points successfully', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    reference_id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a'
                }
            }
        }));

        session.request.onCall(1).returns(Bluebird.resolve({
            statusCode: 201
        }));

        points.add(5, {pending: true}).then(function(referenceId) {
            sinon.assert.calledWith(session.request, 'post', '/v1/points.json', {points: 5, user_id: session.userId, pending: true});

            expect(referenceId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');

            points.release(referenceId).then(function(result) {
                sinon.assert.calledWith(session.request, 'put', '/v1/points/e62ed26b-3a1d-4325-a2d1-9df5efc6f20a.json');

                expect(result).to.equal(true);

                done();
            });
        });
    });

    it('cancels pending points successfully', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    reference_id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a'
                }
            }
        }));

        session.request.onCall(1).returns(Bluebird.resolve({
            statusCode: 204
        }));

        points.add(5, {pending: true}).then(function(referenceId) {
            sinon.assert.calledWith(session.request, 'post', '/v1/points.json', {points: 5, user_id: session.userId, pending: true});

            expect(referenceId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');

            points.cancel(referenceId).then(function(result) {
                sinon.assert.calledWith(session.request, 'delete', '/v1/points/e62ed26b-3a1d-4325-a2d1-9df5efc6f20a.json');

                expect(result).to.equal(true);

                done();
            });
        });
    });

    it('returns false when releasing pending points fails', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    reference_id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a'
                }
            }
        }));

        session.request.onCall(1).returns(Bluebird.resolve({
            statusCode: 400
        }));

        points.add(5, {pending: true}).then(function(referenceId) {
            sinon.assert.calledWith(session.request, 'post', '/v1/points.json', {points: 5, user_id: session.userId, pending: true});

            expect(referenceId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');

            points.release(referenceId).then(function(result) {
                sinon.assert.calledWith(session.request, 'put', '/v1/points/e62ed26b-3a1d-4325-a2d1-9df5efc6f20a.json');

                expect(result).to.equal(false);

                done();
            });
        });
    });

    it('returns false when canceling pending points fails', function(done) {
        session.request.onCall(0).returns(Bluebird.resolve({
            body: {
                data: {
                    reference_id: 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a'
                }
            }
        }));

        session.request.onCall(1).returns(Bluebird.resolve({
            statusCode: 400
        }));

        points.add(5, {pending: true}).then(function(referenceId) {
            sinon.assert.calledWith(session.request, 'post', '/v1/points.json', {points: 5, user_id: session.userId, pending: true});

            expect(referenceId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');

            points.cancel(referenceId).then(function(result) {
                sinon.assert.calledWith(session.request, 'delete', '/v1/points/e62ed26b-3a1d-4325-a2d1-9df5efc6f20a.json');

                expect(result).to.equal(false);

                done();
            });
        });
    });
});