'use strict';
var _ = require('lodash');
var requestErrors = require('request-promise/errors');
var errors = require('./errors');

/**
 * The Appsaholic Point object, used to award, release, and cancel points
 * @param {Session} session
 */
function Point(session) {
    this.session = session;
    this.basePath = '/v1/points';
}

/**
 * Builds the path needed to request the Appsaholic API to award, release, and cancel points.
 * @return {String}
 */
Point.prototype.buildPath = function(path) {
    var base = this.basePath;
    if (!_.isEmpty(path)) {
        base = base + '/' + path;
    }

    return base + '.json';
};

/**
 * Add points to the current user that are immediately available, or pending.
 * @param {Integer} amount  The amount of points to award.
 * @param {Object} options
 * @param {Boolean} [options.pending] Specifies if the points should be made immediately available, or awarded as pending points.
 * @param {Date} [options.time] Specifies when the pending points should be released.
 * @return {Promise}
 */
Point.prototype.add = function(amount, options) {
    var params = {
        user_id: this.session.userId //eslint-disable-line camelcase
    };

    if (_.isPlainObject(options)) {
        _.assign(params, options, {
            points: amount
        });
    } else {
        _.assign(params, {
            points: amount
        });
    }

    var url = this.buildPath();

    return this.session.request('post', url, params).bind(this).then(function(response) {
        var body = response.body;

        return body.data.reference_id;
    }).catch(requestErrors.StatusCodeError, function(reason) {
        var error = reason.error.data;

        switch(error.code){
            case 'AHOLIC-1000':
                throw new errors.InvalidBalanceError(error.message, error.code);
            case 'AHOLIC-1001':
                throw new errors.AddPointsError(error.message, error.code);
            default:
                throw new errors.AppsaholicError();
        }
    });
};

/**
 * Release the awarded pending points, and make them available to the user.
 * @param {String} referenceId  The reference ID of the awarded pending points.
 * @return {Promise}
 */
Point.prototype.release = function(referenceId) {
    var url = this.buildPath(referenceId);

    return this.session.request('put', url).bind(this).then(function(response) {
        return response.statusCode === 201;
    }).catch(requestErrors.StatusCodeError, function(reason) {
        var error = reason.error;

        throw new errors.ReleasePointsError(error.message, error.code);
    });
};

/**
 * Cancel the awarded pending points.
 * @param {String} referenceId  The reference ID of the awarded pending points.
 * @return {Promise}
 */
Point.prototype.cancel = function(referenceId) {
    var url = this.buildPath(referenceId);

    return this.session.request('delete', url).bind(this).then(function(response) {
        return response.statusCode === 204;
    }).catch(requestErrors.StatusCodeError, function(reason) {
        var error = reason.error;

        throw new errors.CancelPointsError(error.message, error.code);
    });
};

module.exports = Point;
