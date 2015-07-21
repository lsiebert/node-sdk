'use strict';
var _ = require('lodash');
var errors = require('./errors');
var requestErrors = require('request-promise/errors');

/**
 * Represents an Appsaholic User
 * @param {Session} session
 */
function User(session) {
    this.session = session;
    this.basePath = '/v1/users';
}

/**
 * Builds the path needed to request the Appsaholic API for the users information.
 * @return {String}
 */
User.prototype.buildPath = function() {
    var path = this.basePath;

    return path + '/' + this.session.userId + '.json';
};

/**
 * Requests the Appsaholic API for the users information, and stores the information on the object.
 * @return {User}
 */
User.prototype.getInformation = function() {
    return this.session.request('get', this.buildPath()).bind(this).then(function(response) {
        var data = response.body.data;
        _.extend(this, data.user);

        return this;
    }).catch(requestErrors.StatusCodeError, function(reason) {
        var error = reason.error.data.error;

        throw new errors.UserNotFoundError(error.message, error.code);
    });
};

module.exports = User;
