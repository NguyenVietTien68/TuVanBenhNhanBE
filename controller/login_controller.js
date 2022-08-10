let database = require('../database')
const bcrypt = require('bcrypt');
const saltRounds = 10;

var loginService = {
    getAllPatienAccounts: function (callback) {
        return database.query("Select * from PatientAccounts", callback);
    },
    getAllDoctorAccounts: function (callback) {
        return database.query("Select * from DoctorAccounts", callback);
    },
    compairDocAccount: function (id, mk, listAcc, req, res) {
        let encryptedPass
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(mk, salt, function (err, hash) {
                encryptedPass = hash;
                for (var i = 0; i < listAcc.length; i++) {
                    // console.log(listAcc[i])
                    if (listAcc[i].UserName == id) {
                        bcrypt.compare(mk, listAcc[i].Password.toString(), function (err, result) {
                            if (result) {
                                return res.send({ code: 100, message: "Đăng nhập thành công" });
                            } else {
                                return res.send({ code: 300, message: "Tài khoản hoặc mật khẩu không hợp lệ" });
                            }
                        })
                    } else {
                        return res.send({ code: 300, message: "Tài khoản hoặc mật khẩu không hợp lệ" });
                    }
                }
            })
        })

    },
    compairPatAccount: function (id, mk, listAcc, req, res) {
        let encryptedPass
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(mk, salt, function (err, hash) {
                encryptedPass = hash;
                for (var i = 0; i < listAcc.length; i++) {
                    // console.log(listAcc[i])
                    if (listAcc[i].UserName == id) {
                        bcrypt.compare(mk, listAcc[i].Password.toString(), function (err, result) {
                            if (result) {
                                return res.send({ code: 200, message: "Đăng nhập thành công" });
                            } else {
                                return res.send({ code: 300, message: "Tài khoản hoặc mật khẩu không hợp lệ" });
                            }
                        })
                    } else {
                        return res.send({ code: 300, message: "Tài khoản hoặc mật khẩu không hợp lệ" });
                    }
                }
            })
        })

    },
}

module.exports = loginService;