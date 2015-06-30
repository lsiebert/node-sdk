'use strict';
var expect = require('chai').expect;

describe('Appsaholic Session', function() {
    var Session = require('../').Session;
    var session;

    beforeEach(function() {
        session = new Session('1fef164ff8c6a023fbf005c6e12c5df81832935a', 'ea92a01fb2865f4980d2348723dd916a32a9e5ba', 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
    });

    it('correctly sets the api key', function() {
        expect(session.credentials.key).to.equal('1fef164ff8c6a023fbf005c6e12c5df81832935a');
    });

    it('correctly sets the api secret', function() {
        expect(session.credentials.secret).to.equal('ea92a01fb2865f4980d2348723dd916a32a9e5ba');
    });

    it('corrctly sets the user id', function() {
        expect(session.userId).to.equal('e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
    });

    it('sets the url', function() {
        expect(session.setUrl('http://example.com'));
        expect(session.buildUrl('/foo/bar')).to.equal('http://example.com/foo/bar');
    });

    it('builds urls correctly', function() {
        expect(session.buildUrl('/foo/bar')).to.equal('https://api.appsaholic.com/foo/bar');
        expect(session.buildUrl('foo/bar')).to.equal('https://api.appsaholic.com/foo/bar');
        expect(session.setUrl('http://example.com/'));
        expect(session.buildUrl('/foo/bar')).to.equal('http://example.com/foo/bar');
    });
});