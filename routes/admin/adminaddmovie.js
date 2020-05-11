var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;

router.get('/adminaddmovies',isAdmin, function (req, res) {
    var get_type = "SELECT * FROM theatertype";
    connection.query(get_type, function (err, foundTypes) {
        if (err) {
            throw err;
        } else {
            var get_genres = "SELECT * FROM moviegenre"
            connection.query(get_genres, function (err, foundGenres) {
                if (err) {
                    throw err;
                } else {
                    var get_director = "SELECT * FROM directors"
                    connection.query(get_director, function (err, founddirector) {
                        if (err) {
                            throw err;
                        } else {
                            res.render("admin/adminaddmovies",{Types:foundTypes, genres:foundGenres, Directors:founddirector});
                        }
                    })
                }
            })

        }
    })
})


router.post("/adminaddmovies",isAdmin, function (req, res) {
    var MovieName = req.body.MovieName;
    var GenretypeID = req.body.GenretypeID;
    var MovieDetail = req.body.MovieDetail;
    var Movielength = req.body.Movielength;
    var Starring = req.body.Starring;
    var MovieRate = req.body.MovieRate;
    var releasedd = req.body.releasedd;
    var outdd = req.body.outdd;
    var releasemm = req.body.releasemm;
    var releaseyy = req.body.releaseyy;
    var outmm = req.body.outmm;
    var outyy = req.body.outyy;
    var Audio = req.body.Audio;
    var MovieImage = req.body.MovieImage;
    var theaterTypeID = req.body.theaterTypeID;
    
    var directorID = req.body.directorID;
    var fName = req.body.fName;
    var lName = req.body.lName;
    var nationality = req.body.nationality;
    var education = req.body.education;
    if (directorID == 0) {
        directorID = null;
        if (fName != '') {
            var sql_director = "INSERT INTO directors (fName,lName) VALUES ('"+fName+"','"+lName+"')";
            connection.query(sql_director, function (err,result){
            if (err) throw err;
            })
        }
        
    }
    //console.log(MovieImage)
    var sql = "INSERT INTO moviedata (movieName,genreTypeID,movieDetail,movieLenght,starring,rate,ReleaseDay, ReleaseMonth,ReleaseYear,OutDay,OutMonth,OutYear,audio, imageLink, theaterTypeID, directorID) VALUES ('"+MovieName+"', '"+GenretypeID+"', '"+MovieDetail+"', '"+Movielength+"', '"+Starring+"', '"+MovieRate+"', '"+releasedd+"', '"+outdd+"', '"+releasemm+"', '"+releaseyy+"', '"+outmm+"', '"+outyy+"', '"+Audio+"', '"+MovieImage+"','"+theaterTypeID+"',"+directorID+")"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        else {
            if (directorID == null){
                var sql_update = "UPDATE moviedata SET moviedata.directorID = (SELECT directorID FROM directors WHERE fName = '"+fName+"') WHERE moviedata.directorID IS NULL AND moviedata.movieName = '"+MovieName+"'";
                connection.query(sql_update, function (err, result) {
                    if (err) throw err;
                })
            }
            
            res.redirect("/manageAdmin");
    
        }
    })

})


router.get('/adminaddShowtime',isAdmin, function (req, res) {
    var get_theater = "SELECT * FROM theater";
    var get_movie= "SELECT * FROM moviedata";

    connection.query(get_theater, function (err, foundTheater) {
        if (err) {
            throw err;
        } else {
            connection.query(get_movie, function (err, foundMovie) {
                if (err) {
                    throw err;
                } else {
                    res.render("admin/adminaddShowtime",{theaters:foundTheater, movies:foundMovie});       
                }
            })

        }
    })
})


router.post('/adminaddShowtime',isAdmin, function (req, res) {
    var movie = req.body.movie;
    var theather = req.body.theather;
    var showtime = req.body.showtime;
    var audio = req.body.audio;
    console.log(movie);
    console.log(theather);
    console.log(showtime);
    console.log(audio);
    var sql_AddShowtime = "INSERT INTO movieshowtime (theaterID,showtime,movieID,audio) VALUES ('"+theather+"','"+showtime+"', '"+movie+"', '"+audio+"')";
    connection.query(sql_AddShowtime, function (err, foundTheater) {
        if (err) {
            throw err;
        } else {
            res.redirect("/manageAdmin");
        }
    })
})



module.exports = router;