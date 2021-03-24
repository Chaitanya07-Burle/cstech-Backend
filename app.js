process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const express = require('express')
const cors = require("cors");
var bodyParser = require('body-parser')

const app = express()
var config = require('./config/config')
var employeeRoute = require('./routes/employee.route')
var mongoose = require('mongoose');
const dbconnection = require('./connection/dbconn');

var connect = config.mongoURI.connectionString
dbconnection.dbconnection(connect)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', employeeRoute);

app.listen(8080, () => console.log('port 8080!'))


module.exports = {
    app: app
};