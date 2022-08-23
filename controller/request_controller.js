var database = require('../database')
const doctor = require('../model/doctor')

var sendRequest = {
    getAllPatienInfo: function (id, callback){
        return database.query("Select * from Patient where IDPatient = ?", [id], callback);
    },
    PatientSendRequest: function (idPa,NamePA,phone,time,dep,sym,meh,state, callback){
        return database.query("INSERT INTO `Request`(`IDPatient`, `NamePatient`, `Phone`, `Time`, `Department`, `Symptom`, `MedicalHistory`, `State`) VALUES (?,?,?,?,?,?,?,'Waiting')", [idPa,NamePA,phone,time,dep,sym,meh,state], callback)
    },
    DoctorAceptRequest: function (idReq,callback){
        return database.query("Select * from Request where IDRequest = ?", [idReq],callback)
    },docGetAllRequest: function (id,callback){
        return doctor.getAllRequestAsDep(id, callback)
    }
}

module.exports = sendRequest;