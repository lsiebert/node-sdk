'use strict';
var request = require('request-promise');

/**
 * The Appsaholic Session object, used to make requests to the Appsaholic API.
 * @param {String} apiKey
 * @param {String} apiSecret
 * @param {String} userId
 */
function Session(apiKey, apiSecret, userId) {
    this.baseUrl = 'https://api.appsaholic.com';
    this.credentials = {
        key: apiKey,
        secret: apiSecret
    };
    this.userId = userId;
}

/**
 * Sets the base URL the session should use for the API.
 * @param {String} url
 * @return {Session}
 */
Session.prototype.setUrl = function(url) {
    this.baseUrl = url;
    return this;
};

/**
 * Builds the URL to the API by concatenating it with the base URL
 * @param  {String} path
 * @return {String}
 */
Session.prototype.buildUrl = function(path) {
    var url = this.baseUrl;
    if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
    }
    if (path.charAt(0) === '/') {
        path = path.slice(1);
    }

    return url + '/' + path;
};

/**
 * Attempts to send a request to the Appsaholic API
 * @param  {String} method Request method (ex: GET, POST, etc.)
 * @param  {String} path   Relative path of an Appsaholic Endpoint
 * @param  {Object} data   An object with data to be sent with the request
 * @return {Promise}
 */
Session.prototype.request = function(method, path, data) {
    var url = this.buildUrl(path);
    var options = {
        uri: url,
        qs: {
            api_key: this.credentials.key //eslint-disable-line camelcase
        },
        method: method,
        json: true,
        body: data,
        resolveWithFullResponse: true
    };

    return request(options).promise();
};

module.exports = Session;
