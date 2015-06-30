var Appsaholic = require('../');
var Session = Appsaholic.Session;
var Point = Appsaholic.Point;

var session = new new Session('API_KEY', 'API_SECRET', 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
var points = new Point(session);

points.add(5, {pending: true}).then(function (referenceId) {
    console.log("Successfully added pending points. Reference ID: %s", referenceId);

    points.cancel(referenceId).then(function (result) {
        if (result === true) {
            console.log('Successfully canceled pending points');
        }
    });
}).catch(function(error) {
    console.log("An error has occurred while awarding points");
    console.log("Name: %s", error.name);
    console.log("Reason: %s", error.message);
    console.log("Code: %s", error.code);
});
