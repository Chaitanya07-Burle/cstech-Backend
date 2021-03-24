var employeeModel = require('../models/employee.model');
const statusCode = require("../shared/statuscode.json");
const mongoose = require("mongoose");
var moment = require('moment');

module.exports.employeeData = function (req) {
    return new Promise((resolve, reject) => {
        try {
            if (!req.body) {
                resolve({
                    Status: parseInt(statusCode.BAD_REQUEST)
                })
            }
            else {
                employeeModel.insertMany({
                    "First Name": req.body['First Name'],
                    "Last Name": req.body['Last Name'],
                    "Status": req.body.Status,
                    "CreateDate": moment.utc(),
                    "EmpContact": [
                        {
                            "user_id": mongoose.Types.ObjectId(),
                            "Phone": req.body.EmpContact[0].Phone,
                            "Email": req.body.EmpContact[0].Email
                        }
                    ],
                    "EmpInfo": [
                        {
                            "user_id": mongoose.Types.ObjectId(),
                            "Gender": req.body.EmpInfo[0].Gender,
                            "Age": req.body.EmpInfo[0].Age,
                            "Designation": req.body.EmpInfo[0].Designation,
                            "Salary": req.body.EmpInfo[0].Salary
                        }
                    ],
                    "DailySales": [
                        {
                            "First Name": req.body.DailySales[0]['First Name'],
                            "Last Name": req.body.DailySales[0]['Last Name'],
                            "Phone": req.body.DailySales[0].Phone,
                            "Email": req.body.DailySales[0].Email,
                            "Status": req.body.DailySales[0].Status,
                            "CreateDate": moment.utc()
                        }
                    ]
                }).then(result => {
                    if (result) {
                        console.log(result[0]._id)
                        resolve({
                            "Status": parseInt(statusCode.OK),
                            "Result": mongoose.Types.ObjectId(result[0]._id)
                        })
                    }
                    else {
                        resolve({
                            "Status": parseInt(statusCode.NOTFOUND)
                        })
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

module.exports.EmployeeProfile = function (req) {
    return new Promise((resolve, reject) => {
        try {
            if (!req.body.id) {
                resolve({
                    Status: parseInt(statusCode.BAD_REQUEST)
                })
            }
            else {
                employeeModel.find({ _id: mongoose.Types.ObjectId(req.body.id) }).then(result => {
                    if (result.length > 0) {
                        resolve({
                            "Status": parseInt(statusCode.OK),
                            "Result": result
                        })
                    }
                    else {
                        resolve({
                            "Status": parseInt(statusCode.NOTFOUND)
                        })
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

module.exports.editEmployeeProfile = function (req) {
    return new Promise((resolve, reject) => {
        try {
            if (!req.body) {
                resolve({
                    Status: parseInt(statusCode.BAD_REQUEST)
                })
            }
            else {
                console.log(req.body.id)
                employeeModel.find({ _id: mongoose.Types.ObjectId(req.body.id) }).then(response => {
                    if (response.length > 0) {
                        console.log("inside")
                        employeeModel.updateMany({ _id: mongoose.Types.ObjectId(req.body.id) }, {
                            $set: {
                                "First Name": (req.body['First Name'] === response[0]['First Name']) ? response[0]['First Name'] : req.body['First Name'],
                                "Last Name": (req.body['Last Name'] === response[0]['Last Name']) ? response[0]['Last Name'] : req.body['Last Name'],
                                "Status": (req.body['Status'] === response[0]['Status']) ? response[0]['Status'] : req.body['Status'],
                                "EmpContact": [
                                    {
                                        "user_id": mongoose.Types.ObjectId(),
                                        "Phone": (req.body.EmpContact[0].Phone === response[0].EmpContact[0].Phone) ? response[0].EmpContact[0].Phone : req.body.EmpContact[0].Phone,
                                        "Email": (req.body.EmpContact[0].Email === response[0].EmpContact[0].Email) ? response[0].EmpContact[0].Email : req.body.EmpContact[0].Email
                                    }
                                ],
                                "EmpInfo": [
                                    {
                                        "user_id": mongoose.Types.ObjectId(),
                                        "Gender": (req.body.EmpInfo[0].Gender === response[0].EmpInfo[0].Gender) ? response[0].EmpInfo[0].Gender : req.body.EmpInfo[0].Gender,
                                        "Age": (req.body.EmpInfo[0].Age === response[0].EmpInfo[0].Age) ? response[0].EmpInfo[0].Age : req.body.EmpInfo[0].Age,
                                        "Designation": (req.body.EmpInfo[0].Designation === response[0].EmpInfo[0].Designation) ? response[0].EmpInfo[0].Designation : req.body.EmpInfo[0].Designation,
                                        "Salary": (req.body.EmpInfo[0].Salary === response[0].EmpInfo[0].Salary) ? response[0].EmpInfo[0].Salary : req.body.EmpInfo[0].Salary
                                    }
                                ],
                                "DailySales": [
                                    {
                                        "First Name": (req.body.DailySales[0]['First Name'] === response[0].DailySales[0]['First Name']) ? response[0].DailySales[0]['First Name'] : req.body.DailySales[0]['First Name'],
                                        "Last Name": (req.body.DailySales[0]['Last Name'] === response[0].DailySales[0]['Last Name']) ? response[0].DailySales[0]['Last Name'] : req.body.DailySales[0]['Last Name'],
                                        "Phone": (req.body.DailySales[0].Phone === response[0].DailySales[0].Phone) ? response[0].DailySales[0].Phone : req.body.DailySales[0].Phone,
                                        "Email": (req.body.DailySales[0].Email === response[0].DailySales[0].Email) ? response[0].DailySales[0].Email : req.body.DailySales[0].Email,
                                        "Status": (req.body.DailySales[0].Status == response[0].DailySales[0].Status) ? response[0].DailySales[0].Status : req.body.DailySales[0].Status,
                                        "CreateDate": moment.utc()
                                    }
                                ]
                            }
                        }).then(result => {
                            if (result.n == 0) {
                                resolve({
                                    "Status": parseInt(statusCode.NOTFOUND)
                                })
                            }
                            else {
                                resolve({
                                    "Status": parseInt(statusCode.OK)
                                })
                            }
                        }).catch(err => {
                            reject(err)
                        })
                    }
                    else {
                        resolve({
                            "Status": parseInt(statusCode.NOTFOUND)
                        })
                    }
                }).catch((err) => {
                    reject(err);
                })
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

module.exports.unusedEmployee = function (req) {
    return new Promise((resolve, reject) => {
        try {
            if (!req.body) {
                resolve({
                    Status: parseInt(statusCode.BAD_REQUEST)
                })
            }
            else {
                employeeModel.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) }).then(result => {
                    console.log(result, "rr")
                    if (result.n == 1) {
                        resolve({
                            "Status": parseInt(statusCode.OK)
                        })
                    }
                    else {
                        resolve({
                            "Status": parseInt(statusCode.NOTFOUND)
                        })
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

module.exports.statusEmployee = function (req) {
    return new Promise((resolve, reject) => {
        try {
            if (!req.body) {
                resolve({
                    Status: parseInt(statusCode.BAD_REQUEST)
                })
            }
            else {
                employeeModel.find({ _id: mongoose.Types.ObjectId(req.body.id) }).then(result => {
                    if (result.length > 0) {
                        employeeModel.updateMany({ _id: mongoose.Types.ObjectId(req.body.id) }, {
                            $set: {
                                "Status": req.body.Status
                            }
                        }).then(result => {
                            if (result.n == 1) {
                                resolve({
                                    "Status": parseInt(statusCode.OK)
                                })
                            }
                            else {
                                resolve({
                                    "Status": parseInt(statusCode.NOTFOUND)
                                })
                            }
                        })
                    }
                    else {
                        resolve({
                            "Status": parseInt(statusCode.NOTFOUND)
                        })
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        }
        catch (err) {
            reject(err);
        }
    })
}