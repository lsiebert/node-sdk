var Appsaholic = require('../');
var Session = Appsaholic.Session;
var User = Appsaholic.User;

var session = new Session('API_KEY', 'API_SECRET', 'e62ed26b-3a1d-4325-a2d1-9df5efc6f20a');
var user = new User(session);
user.getInformation().then(function(user) {
    console.log("ID: %s", user.id);
    console.log("Email: %s", user.email);
    console.log("First Name: %s", user.first_name);
    console.log("Last Name: %s", user.last_name);
    console.log("Available Points: %d", user.available_points);
    console.log("Pending Points: %d", user.pending_points);
}).catch(function(error) {
    console.log("An error has occurred while getting the users information");
    console.log("Name: %s", error.name);
    console.log("Reason: %s", error.message);
    console.log("Code: %s", error.code);
});
