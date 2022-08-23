var express = require('express');
var router = express.Router();
database = require('../database')

const patientController = require('../controller/patient_controller')

router.get('/sendRequest',patientController.sendRequest);
router.get('/sendEvaluation', patientController.evaluate)

router.get('/logout', function(req, res) {
    res.clearCookie("idDoc")
    res.clearCookie("idPat")
    console.log("logged out")
})

module.exports = router;
