var database = require('../database')

var doctor = {
    getAllRequestAsDep: function (department,callback) {
        // let department = req.body.Department;
        return database.query("Select * from Request where Department = ?", [department],callback);
    }
}

module.exports = doctor;