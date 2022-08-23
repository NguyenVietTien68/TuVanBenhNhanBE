const passdefaut = "123456";
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.sendRequest = function (req, res) {
    const { cookies } = req;
    var idPat = cookies.idPat;

    var taketime = new Date();
    var time = taketime.getHours() + ":" + taketime.getMinutes() + " ; " + taketime.getDay() + "-" + taketime.getMonth() + "-" + taketime.getFullYear();
    let symptom = req.body.symptom;
    let medicalHistory = req.body.mh;
    let department = req.body.dep;
    let state = "Waiting"

    database.getPatienInfor(idPat, function (results) {
        database.sendRequest(results[0].IDPatient, results[0].NamePatient, results[0].Phone, time, department, symptom, medicalHistory, function (result) {
            res.send({ code: 200, message: "Gửi request thành công" })
        })
    })
    // INSERT INTO `Request`(`IDPatient`, `NamePatient`, `Phone`, `Time`, `Department`, `Symptom`, `MedicalHistory`, `State`) VALUES (?,?,?,?,?,?,?,'Waiting')
}

module.exports.evaluate = function (req, res){
    let idReq = req.body.idReq;
    let idDoc = req.body.idDoc;
    let quality = req.body.quality;
    let note = req.body.note;

    database.evaluate(idReq, idDoc, quality, note, function (result){
        return res.send({code: 200, message:"Đánh giá hành công yêu cầu " + idReq + " của bác sỹ " + idDoc})
    })
}