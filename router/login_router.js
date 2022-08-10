var express = require('express');
var router = express.Router();
database = require('../database')

const loginService = require('../controller/login_controller')

router.get('/login/:role?/:id?/:pass?', function (req, res, next) {
    let role = req.params.role;
    if (role == 'bs') {
        loginService.getAllDoctorAccounts(function (err, results) {
            loginService.compairDocAccount(req.params.id, req.params.pass, results, req, res, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        })
    } else {
        loginService.getAllPatienAccounts(function (err, results) {
            loginService.compairPatAccount(req.params.id, req.params.pass, results, req, res, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        })
    }
})

router.get('/sendrequest', function (req, res, next) {
    
})

module.exports = router;