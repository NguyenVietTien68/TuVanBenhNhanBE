var express = require('express');
var router = express.Router();
database = require('../database')
var database= require('../database')

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var doctor = require('../model/doctor')

const requestService = require('../controller/request_controller')

router.get('/sendrequest/:idPatient?',function(req, res, next){
    requestService.getAllPatienInfo(req.params.idPatient, function(err, result){
        var taketime = new Date();
        var time = taketime.getHours() + ":" + taketime.getMinutes() + " ; " + taketime.getDay() + "-" + taketime.getMonth()+ "-" + taketime.getFullYear();
        let symptom = "Hắt xì";
        let medicalHistory = "Covid";
        let department = "Tim mạch"
        let state = "Waiting"

        requestService.PatientSendRequest(result[0].IDPatient,result[0].NamePatient,result[0].Phone,time,department, symptom, medicalHistory, state , function(err){
            if(err){
                console.log(err)
            }
        })
    })
})
router.post('/aceptrequest/',function(req, res, next){
    let idreq = req.body.IDRequest;
    // database.query("UPDATE `Request` SET `State`= 'Waiting'  WHERE IDRequest = "+idreq );
    console.log(idreq);
    // console.log('hello')
    // io.on('connection', (socket) => {
    //     console.log('Ket noi thanh cong')
    //     // socket.on('chat message', msg => {
    //     //   io.emit('hihi', msg);
    //     // });
    // });
    // console.log('di duoc')
})

router.get('/getRequest',function(req, res, next){
    let iddep = req.body.Department;
    const data = doctor.getAllRequestAsDep(iddep);
    console.log("aaaaaaaaaaaaaaa",data);

})

module.exports = router;
