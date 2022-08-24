module.exports.getRequestByDep = function (req, res) {
    const { cookies } = req;
    var idDoc = cookies.idDoc;
    database.getDepByIDDoc(idDoc, function ( results){
        if(results.length > 0){
            // console.log(results);
            database.getAllRequestByDep(results[0].Department, function (requests){
                // console.log(requests);
                res.send(requests);
            })
        }
    })
}

module.exports.acceptRequest = function (req, res) {
    let idReq = req.params.idreq;
    database.aceptRequest(idReq, function (results){
        database.changeRequestState(idReq, function (result){
            res.send(results);
        })
    })
}
