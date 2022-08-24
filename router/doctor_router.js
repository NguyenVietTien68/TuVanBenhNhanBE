var express = require('express');
var router = express.Router();
const doctorController = require('../controller/doctor_controller')

router.get('/getRequest',doctorController.getRequestByDep)

router.get('/acceptRequest/:idreq', doctorController.acceptRequest)

router.get('/logout', function(req, res) {
    res.clearCookie("idDoc")
    res.clearCookie("idPat")
    console.log("logged out")
})
module.exports = router;