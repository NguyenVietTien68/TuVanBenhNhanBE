var database = require("../database");

module.exports.requireAuth = function(req, res, next){
    const{cookies} =req;
    console.log(cookies.idPat);
    let id = cookies.idPat
    // console.log("ID = "+id); 
    if(!cookies.idPat){
        console.log("Day khong phai la bac sy")
        return res.send({ code: 500, message: "Không được phép truy cập"})
    }
    database.getPassByIDPat(id, function (result){
        if (result.length > 0) {
            return res.send({ code: 500, message: "Không được phép truy cập"})
            // console.log(result);
            // console.log("Day khong phai la bac sy")
        }
    })
    next();
};