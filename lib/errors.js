'use strict';
var util = require('util');

function InvalidBalanceError (message, code) {
    Error.call(this);
    this.message = message;
    this.code = code;
    this.name = 'InvalidBalanceError';
}

function AddPointsError (message, code) {
    Error.call(this);
    this.message = message;
    this.code = code;
    this.name = 'AddPointsError';
}

function ReleasePointsError (message, code) {
    Error.call(this);
    this.message = message;
    this.code = code;
    this.name = 'ReleasePointsError';
}

function CancelPointsError (message, code) {
    Error.call(this);
    this.message = message;
    this.code = code;
    this.name = 'CancelPointsError';
}

function ReferenceIdNotFoundError (message, code) {
    Error.call(this);
    this.message = message;
    this.code = code;
    this.name = 'ReferenceIdNotFoundError';
}

function AppsaholicError () {
    Error.call(this);
    this.message = 'An unforeseen exception has occurred.';
    this.code = 'AHOLIC-0000';
    this.name = 'AppsaholicError';
}

util.inherits(InvalidBalanceError, Error);
util.inherits(AddPointsError, Error);
util.inherits(ReleasePointsError, Error);
util.inherits(CancelPointsError, Error);
util.inherits(ReferenceIdNotFoundError, Error);
util.inherits(AppsaholicError, Error);

module.exports = {
    InvalidBalanceError: InvalidBalanceError,
    AddPointsError: AddPointsError,
    ReleasePointsError: ReleasePointsError,
    CancelPointsError: CancelPointsError,
    ReferenceIdNotFoundError: ReferenceIdNotFoundError,
    AppsaholicError: AppsaholicError
};
