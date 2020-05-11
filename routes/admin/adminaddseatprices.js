var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;

router.get('/adminaddseatprices', isAdmin,function (req, res) {
    var get_branch = "SELECT * FROM branch";
    connection.query(get_branch, function (err, foundBranch) {
        if (err) {
            throw err;
        } else {
            var get_theatertypes = "SELECT * FROM theatertype"
            connection.query(get_theatertypes, function (err, foundtheatertype) {
                if (err) {
                    throw err;
                } else {
                    res.render("admin/adminaddseatprices", {Branches:foundBranch, Theatertypes:foundtheatertype,success:0});      
                }
            })
        }
    })
})


router.post('/adminaddseatprices',isAdmin, function (req, res) {
    var Branch = req.body.Branch;
    var TheathertypeID = req.body.TheathertypeID;
   
    var get_branch = "SELECT branchID,branchName FROM branch  WHERE branchID = '"+Branch+"'";
    connection.query(get_branch, function (err, foundBranch) {
        if (err) {
            throw err;
        } else {
            var get_theatertypes = "SELECT theaterTypeID,TheaterTypeName FROM theatertype WHERE theaterTypeID = '"+TheathertypeID+"'"
            connection.query(get_theatertypes, function (err, foundtheatertype) {
                if (err) {
                    throw err;
                } else {          
                    var get_TheatherID = "SELECT theaterID,theaterNo FROM theater WHERE branchID = '"+Branch+"' AND theaterTypeID = '"+TheathertypeID+"' "
                    connection.query(get_TheatherID, function (err, foundTheatherID){
                        if (err) {
                            throw err;
                        } else {         
                            var get_seattype = "SELECT * FROM seat_type"
                            connection.query(get_seattype, function (err, foundseattype){
                                if (err) {
                                    throw err;
                                } else {
                                    var get_seatrow = "SELECT * FROM seat_row"
                                    connection.query(get_seatrow, function (err, foundseatrow){
                                        if (err) {
                                            throw err;
                                        } else {
                                            var get_showtime = "SELECT * FROM movieshowtime WHERE DATE(showtime) >= '2020-05-09' ORDER BY showtime DESC "
                                            connection.query(get_showtime, function (err, foundtime){
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    console.log(foundtime);
                                                    res.render("admin/adminaddseatprice2", {
                                                        branchName:foundBranch[0],
                                                        TheaterTypeName:foundtheatertype[0],
                                                        theaterIDs:foundTheatherID,
                                                        Seattypes:foundseattype,
                                                        Seatrows:foundseatrow,
                                                        showtime:foundtime
                                                    });
                                                }
                                            })
                                        }
                                    })
                                }
                            })   
                        }
                    })
                }
            })
        }
    })
})

router.post("/adminaddseatprices2/:branchID/:theaterTypeID",isAdmin, function (req, res) {
    var Branch = req.params.branchID;
    var TheathertypeID = req.params.theaterTypeID;

    var Seattypes = req.body.Seattypes;
    var seat_no = req.body.seat_no;
    var Seatprice = req.body.seatPrice;
    var seat_row = req.body.seatRows;

    var fields = req.body.theater_noANDshowtime.split('-');
    var theater_ID = fields[0];
    var showtime_ID = fields[1];

    var position =[];
    for (var i=0; i<135;  i++){
        position.push(0);
    }

    console.log(position);
    console.log(theater_ID);
    console.log(showtime_ID);

    var sql_addSeatRows = "INSERT INTO seat_row(name) VALUES ('"+seat_row+"')";
    connection.query(sql_addSeatRows, function (err, result1) {
        if (err) {
            throw err;
        } else {
            var get_seatrow = "SELECT DISTINCT row_id FROM seat_row WHERE name = '"+seat_row+"'"
            connection.query(get_seatrow, function (err, foundseatrow){
                if (err) {
                    throw err;
                } else {
                    var sql_seat = "INSERT INTO seat (position,seatRow,seatNumber, seatType,theaterID,price,movieShowtimeID ) VALUES ('"+position+"','"+foundseatrow[0].row_id+"','"+seat_no+"', '"+Seattypes+"', '"+theater_ID+"', '"+Seatprice+"', '"+showtime_ID+"')";
                    connection.query(sql_seat, function (err, result1) {
                        if (err) {
                            throw err;
                        } else {
                            console.log('insert complete');
                            res.redirect("/manageAdmin");
                        }
                    })
                }
            })
        }
    })
})


module.exports = router;