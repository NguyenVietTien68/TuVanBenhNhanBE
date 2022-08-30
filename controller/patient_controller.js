const passdefaut = "123456";
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.sendRequest = function (req, res) {
    const { cookies } = req;
    var idPat = cookies.idPat;

    // var taketime = new Date();
    // var time = taketime.getHours() + ":" + taketime.getMinutes() + " ; " + taketime.getDay() + "-" + taketime.getMonth() + "-" + taketime.getFullYear();
    let idPatient = req.body.idPatient;
    let name = req.body.name;
    let phone = req.body.phone;
    let time = req.body.time;
    let symptom = req.body.symptom;
    let medicalHistory = req.body.medicalHistory;
    let department = req.body.department;
    let state = "Waiting"

    if (idPatient != null) {
        database.sendRequest(idPatient, name, phone, time, department, symptom, medicalHistory, function (result) {
            res.send({ code: 200, message: "Gửi request thành công" })
        })
    }else{
        idPatient = null;
        database.sendGuestRequest(idPatient, name, phone, time, department, symptom, medicalHistory, function (result) {
            res.send({ code: 200, message: "Gửi request thành công" })
        })
    }

    // INSERT INTO `Request`(`IDPatient`, `NamePatient`, `Phone`, `Time`, `Department`, `Symptom`, `MedicalHistory`, `State`) VALUES (?,?,?,?,?,?,?,'Waiting')
}

module.exports.evaluate = function (req, res) {
    let idReq = req.body.idReq;
    let idDoc = req.body.idDoc;
    let quality = req.body.quality;
    let note = req.body.note;

    database.evaluate(idReq, idDoc, quality, note, function (result) {
        return res.send({ code: 200, message: "Đánh giá hành công yêu cầu " + idReq + " của bác sỹ " + idDoc })
    })
}