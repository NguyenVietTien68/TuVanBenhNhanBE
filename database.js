const mysql = require("mysql");
const connection = mysql.createConnection({
    host: '103.153.74.184',
    user: 'tv_hewo_vn',
    password: 'tv_hewo_vn',
    database: 'tv_hewo_vn'
});

const connect = function (req, res) {
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }
    })
}

connect();

//doctor data
exports.getAllDoctor = function (callbackQuery) {
    connection.query("Select * from Doctor", function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.getDoctorInfor = function (id,callbackQuery) {
    connection.query("Select * from Doctor where IDDoctor = ?",[id], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}


exports.getDoctorPass = function (username, callbackQuery) {
    connection.query("Select Password from DoctorAccounts where UserName = ?",[username], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.getDocPassByID = function (id, callbackQuery) {
    connection.query("Select Password from DoctorAccounts where IDDoctor = ?",[id], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.getAllDoctorAcc = function (callbackQuery) {
    connection.query("Select * from DoctorAccounts", function (err, results){
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.checkDoctorAccount= function (username, callbackQuery){
    connection.query("Select * from DoctorAccounts where UserName =?", [username], function (err, results){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.addDoctor = function (name, sex, department, age, email, image, callbackQuery) {
    connection.query("Insert into Doctor set DoctorName =?, Sex = ?, Department =?, Age = ?, Email=?, Image=?", [name, sex, department, age, email, image], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.createDoctorAcc = function ( mk, username, callbackQuery) {
    connection.query("Insert into Doctoraccounts set Password = ?, UserName = ?", [mk, username], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.getDepByIDDoc = function (id,callbackQuery) {
    connection.query("Select Department from Doctor where IDDoctor = ?",[id], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

//Paitien data
exports.getPatienInfor = function (id,callbackQuery) {
    connection.query("Select * from Patient where IDPatient = ?", [id, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.createPatient = function ( name, age, email, sex, address, phone, callbackQuery) {
    connection.query("Insert into Patient set NamePatient =?, Age = ?, Email=?, Sex = ?, Address = ?, Phone = ?", [name, age, email, sex, address, phone, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.createPatientAcc = function (username, mk, callbackQuery) {
    connection.query("Insert into PatientAccounts set UserName = ?,  Password = ?", [username, mk, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.checkPatienAccount= function (username, callbackQuery){
    connection.query("Select * from PatientAccounts where UserName =?", [username], function (err, results){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.getPassByIDPat= function (id, callbackQuery){
    connection.query("Select Password from PatientAccounts where IDPatien =?", [id], function (err, results){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.getPatienAcc = function (callbackQuery) {
    connection.query("Select * from PatientAccounts", function (err, results) {
        if(!err) {
            callbackQuery(results);
        }else {
            console.log(err);
        }
    })
}

exports.evaluate = function (idRed, idDoc, quality, note, callbackQuery) {
    connection.query("Insert into Evaluation set IDRequest = ?, IDDoctor = ?, Quality = ?, Note = ?",[idRed, idDoc, quality, note], function (err, results) {
        if(!err) {
            callbackQuery(results);
        }else {
            console.log(err);
        }
    })
}

//request data
exports.getAllRequest = function (callbackQuery) {
    connection.query("SELECT * FROM Request", function (err, results){
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.getAllRequestByDep = function (dep, callbackQuery) {
    connection.query("SELECT * FROM Request where Department = ? and State = 'Waiting' ",[dep], function (err, results){
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.sendRequest = function (idPatient, name, phone, time, department, symptom, medical, callbackQuery) {
    connection.query("INSERT INTO `Request`(`IDPatient`, `NamePatient`, `Phone`, `Time`, `Department`, `Symptom`, `MedicalHistory`, `State`) VALUES (?,?,?,?,?,?,?,'Waiting') ", [idPatient, name, phone, time, department,symptom, medical, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.sendGuestRequest = function (idPatient, name, phone, time, department, symptom, medical, callbackQuery) {
    connection.query("INSERT INTO `Request`(`NamePatient`, `Phone`, `Time`, `Department`, `Symptom`, `MedicalHistory`, `State`) VALUES (?,?,?,?,?,?,?,'Waiting') ", [idPatient, name, phone, time, department,symptom, medical, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.acceptRequest = function (id,callbackQuery) {
    connection.query("SELECT * FROM Request where id = ?", function (err, results){
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.changeRequestState = function (id,callbackQuery) {
    connection.query("UPDATE `Request` SET `State`='Accepted' WHERE id = ?", function (err, results){
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

// getAllPatienInfo: function (id, callback){
//     return database.query("Select * from Patient where IDPatient = ?", [id], callback);
// },
// PatientSendRequest: function (idPa,NamePA,phone,time,dep,sym,meh,state, callback){
//     return database.query("INSERT INTO `Request`(`IDPatient`, `NamePatient`, `Phone`, `Time`, `Department`, `Symptom`, `MedicalHistory`, `State`) VALUES (?,?,?,?,?,?,?,'Waiting')", [idPa,NamePA,phone,time,dep,sym,meh,state], callback)
// },
// DoctorAceptRequest: function (idReq,callback){
//     return database.query("Select * from Request where IDRequest = ?", [idReq],callback)
// },docGetAllRequest: function (id,callback){
//     return doctor.getAllRequestAsDep(id, callback)
// }
