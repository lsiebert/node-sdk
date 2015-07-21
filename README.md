Appsaholic SDK for NodeJS
======================
[![npm package](https://nodei.co/npm/appsaholic-sdk.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/appsaholic-sdk/)

[![Build Status](https://travis-ci.org/Appsaholic/node-sdk.svg?branch=master)](https://travis-ci.org/Appsaholic/node-sdk)

This repository contains the open source NodeJS SDK that allows you to access the Appsaholic
platform from your NodeJS application.

Installation
------------

``` bash
npm install appsaholic-sdk --save
```

Usage
-----

Minimal example:

``` js
var Appsaholic = require('appsaholic-sdk'),
    Session = Appsaholic.Session,
    User = Appsaholic.User;

var session = new Session('API_KEY', 'API_SECRET', 'e8d90954-8ce7-498e-96f3-cac57f54e524');
var points = new Point(session);

// Immediately add 100 points to the users account
points.add(100).then(function(referenceId) {
    // Log the referenceId, print it out, etc. 
});
```

See the `examples` directory for numerous usages.

Contributing
----------
If you'd like to contribute to this package, please be sure to checkout the [contributing guide](CONTRIBUTING.md) before getting started.

To start developing for this package:

1. Clone the repository to your machine
2. Navigate to the main folder within your shell
3. Install all the dependencies for the package

    ```bash
    npm install
    ```
4. Install [Gulp](http://gulpjs.com/) globally if you haven't already *(optional)*

    ```bash
    npm install gulp -g
    ```
5. Run `gulp`, or if you don't want to install globally run `./node_modules/.bin/gulp`

Running `gulp` or `gulp default` will watch the source files, and upon saved changes will automatically run the code through ESLint as well as run the unit tests.

If you don't want to use Gulp at all, you can run the following included commands for testing and development:

Unit Tests

``` bash
npm test
```

Linting

``` bash
npm lint
```

Coverage

``` bash
npm cover
```
