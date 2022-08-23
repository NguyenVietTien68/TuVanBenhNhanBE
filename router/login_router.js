var express = require('express');
var router = express.Router();
const loginController = require("../controller/login_controller")

router.get('/login', loginController.login)
router.get('/signup', loginController.signup)

router.get('/logout', function(req, res) {
    res.clearCookie("idDoc")
    res.clearCookie("idPat")
    console.log("logged out")
})

module.exports = router;