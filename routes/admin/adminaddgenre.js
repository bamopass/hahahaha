var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;

router.get('/adminaddgenre',isAdmin, function (req, res) {
    var get_genre = 'SELECT * FROM moviegenre';
    connection.query(get_genre,function(err,genreData) {
        if (err) throw err;
        else {
            res.render("admin/adminaddgenre", { title: 'Genre Form', genre:genreData });
        }
    });
});

router.post("/addminaddgenre",isAdmin,function (req,res) {
    var genreTypeName = req.body.genreTypeName;

    var sql = "INSERT INTO moviegenre (genreTypeName) VALUES ('"+genreTypeName+"')";
    connection.query(sql, function(err,result) {
        if (err) throw err;
        else {
            console.log(genreTypeName + " is successfully inserted into moviegenre");
            res.redirect("/manageAdmin");
        }
    });
});
module.exports = router;
