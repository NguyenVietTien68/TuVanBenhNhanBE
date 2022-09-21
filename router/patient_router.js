var express = require('express');
var router = express.Router();
database = require('../database')

const patientController = require('../controller/patient_controller')

router.post('/sendRequest',patientController.sendRequest);
router.get('/sendEvaluation', patientController.evaluate)
router.get('/getPatientByID/:idPat', patientController.getPaitientByID)

router.get('/logout', function(req, res) {
    res.clearCookie("idDoc")
    res.clearCookie("idPat")
    console.log("logged out")
})

module.exports = router;
