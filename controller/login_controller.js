const bcrypt = require('bcrypt');
const database = require("../database")

module.exports.login = function (req, res) {
    let username = req.body.id;
    let pass = req.body.password;
    // console.log(username,pass)
    database.checkDoctorAccount(username, function (results) {
        if (results.length > 0) {
            bcrypt.compare(pass, results[0].Password.toString(), function (err, result) {
                // if(result){
                //     res.cookie('idDoc', results[0].IDDoctor);
                //     return res.send({code: 100, message:"Bác sỹ đăng nhập thành công"})
                // }else{
                //     return res.send({code: 400, message:"Tài khoản hoặc mật khẩu không hợp lệ"})
                // }
                console.log(result)
            });
        } else {
            database.checkPatienAccount(username, function (results) {
                if (results.length > 0) {
                    bcrypt.compare(pass, results[0].Password.toString(), function (err, result) {
                        if (result) {
                            res.cookie('idPat', results[0].IDPatient);
                            return res.send({ code: 101, message: "Bệnh nhân đăng nhập thành công" })
                        } else {
                            return res.send({ code: 400, message: "Tài khoản hoặc mật khẩu không hợp lệ" })
                        }
                    });
                } else {
                    return res.send({ code: 400, message: "Tài khoản hoặc mật khẩu không hợp lệ" })
                }
            })
        }
    })
}

module.exports.signup = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let age = req.body.age;
    let email = req.body.email;
    let sex = req.body.sex;
    let address = req.body.address;
    let phone = req.body.phone;

    database.checkPatienAccount(username, function (acc) {
        if (acc.length > 0) {
            return res.send({ code: 202, message: "Username này đã tồn tại" })
        } else {
            database.checkPatienAccount(username, function (check) {
                if (check.length > 0) {
                    return res.send({ code: 202, message: "Username này đã tồn tại" })
                } else {
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        let hashpass = hash.toString();
                        database.createPatient(name, age, email, sex, address, phone, function (result) {
                            database.createPatientAcc(username, hashpass, function (results) {
                                return res.send({ code: 200, message: "Đăng ký thành công " })
                            })
                        })
                    })
                }
            })
        }
    })
}
