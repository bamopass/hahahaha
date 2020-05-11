var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;

router.get('/adminaddtheatertype',isAdmin, function (req, res) {
    var get_type = "SELECT * FROM theatertype";
    connection.query(get_type, function (err, foundTypes) {
        if (err) {
            throw err;
        } else {
            res.render("admin/adminaddtheatertype",{Types:foundTypes});
        }
    })
})


router.post("/adminaddtheatertype",isAdmin, function (req, res) {
    var TheaterTypeName = req.body.TheaterTypeName;
    // var GenretypeID = req.body.GenretypeID;
    // var MovieDetail = req.body.MovieDetail;
    // var Movielength = req.body.Movielength;
    // var Starring = req.body.Starring;
    // var MovieRate = req.body.MovieRate;
    // var releasedd = req.body.releasedd;
    // var outdd = req.body.outdd;
    // var releasemm = req.body.releasemm;
    // var releaseyy = req.body.releaseyy;
    // var outmm = req.body.outmm;
    // var outyy = req.body.outyy;
    // var Audio = req.body.Audio;
    // var MovieImage = req.body.MovieImage;
    
    //console.log(MovieImage)

    var sql = "INSERT INTO theatertype (TheaterTypeName) VALUES ('"+TheaterTypeName +"')";
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(TheaterTypeName);
            res.redirect("/manageAdmin");
        }
    })
})
module.exports = router;