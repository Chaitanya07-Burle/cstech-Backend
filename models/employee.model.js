'use strict'
const mongoose = require("mongoose");

const EmpInfoSchema = mongoose.Schema({
    userd_id: { type: mongoose.Schema.Types.ObjectId },
    Gender: { type: String },
    Age: { type: String },
    Designation: { type: String },
    Salary: { type: Number }
});

const EmpContactSchema = mongoose.Schema({
    userd_id: { type: mongoose.Schema.Types.ObjectId },
    Phone: { type: Number },
    Email: { type: String }
});

const DailySalesSchema = mongoose.Schema({
    "First Name": { type: String },
    "Last Name": { type: String },
    Phone: { type: Number },
    Email: { type: String },
    Status: { type: String },
    CreateDate: { type: Date }
});

const EmployeeSchema = mongoose.Schema({
    "First Name": { type: String },
    "Last Name": { type: String },
    Status: { type: String },
    CreateDate: { type: Date },
    EmpContact: [EmpContactSchema],
    EmpInfo: [EmpInfoSchema],
    DailySales: [DailySalesSchema]
});

const EmployeeMapping = (module.exports = mongoose.model(
    "Employee",
    EmployeeSchema,
    "Employee"
));
