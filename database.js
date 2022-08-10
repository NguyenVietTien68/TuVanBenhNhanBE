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

exports.getAllDoctor = function (callbackQuery) {
    connection.query("Select * from Doctor", function (err, results) {
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

exports.addDoctor = function (name, sex, department, age, email, image, callbackQuery) {
    connection.query("Insert into Doctor set DoctorName =?, Sex = ?, Department =?, Age = ?, Email=?, Image=?", [name, sex, department, age, email, image], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.createDoctorAcc = function (tk, mk, callbackQuery) {
    connection.query("Insert into Doctoraccounts set IDDoctor =?, Password = ?", [tk, mk, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.createPatient = function ( name, age, email, sex, address, phone, callbackQuery) {
    connection.query("Insert into Patient set NamePatien =?, Age = ?, Email=?, Sex = ?, Address = ?, Phone = ?", [name, age, email, sex, address, phone, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.createPatientAcc = function (tk, mk, callbackQuery) {
    connection.query("Insert into Patientaccounts set IDPatient =?, Password = ?", [tk, mk, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        } else {
            console.log(err);
        }
    })
}

exports.getPatienAcc = function (callbackQuery) {
    connection.query("Select * from Patientaccounts", function (err, results) {
        if(!err) {
            callbackQuery(results);
        }else {
            console.log(err);
        }
    })
}

exports.sendRequest = function (idPatient, name, phone, time, department, symptom, medical, callbackQuery) {
    connection.query("INSERT INTO Request set IDPatien = ?, NamePatien = ?, Phone = ?, Time = ?, Department= ?, Symptom=?, MedicalHistory=? ", [idPatient, name, phone, time, department,symptom, medical, callbackQuery], function (err, results) {
        if (!err) {
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })
}

exports.getAllRequest = function (callbackQuery) {
    connection.query("SELECT * FROM Request", function (err, results){
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

module.exports=connection;
