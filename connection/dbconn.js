var mongoose = require('mongoose');

var dbconnection = function (connectionString) {
    console.log("hi")
    var dbErrstatus = false;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        var mongoDb = mongoose.connection;
        //checking databse connectivity 
        if (err) {
            console.log("Database not connected", err);
            dbErrstatus = true;
        } else {

            console.log('Connected to the Database');
        }
    });
}

module.exports = { dbconnection: dbconnection }