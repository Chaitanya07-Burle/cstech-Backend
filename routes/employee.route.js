var express = require('express');
var helper = require('../service/employee.service');
const router = express.Router();

router.post("/employeeData", (req, res) => {

    helper.employeeData(req).then(result => {
        // console.log("rrrrrrrrrrrrrrr",result)
        res.send(result);
    });
});

router.post("/EmployeeProfile", (req, res) => {
    helper.EmployeeProfile(req).then(result => {
        res.send(result);
    })
})

router.put("/editEmployeeProfile", (req, res) => {
    helper.editEmployeeProfile(req).then(result => {
        res.send(result);
    })
})

router.delete("/unusedEmployee", (req, res) => {
    helper.unusedEmployee(req).then(result => {
        res.send(result);
    })
})

router.post("/statusEmployee", (req, res) => {
    helper.statusEmployee(req).then(result => {
        res.send(result);
    })
})

module.exports = router;