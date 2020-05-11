var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;

router.get('/adminAnalysis',isAdmin, function (req, res) {
    
    var sql4 = 'SELECT g.genreTypeID, g.genreTypeName, COUNT(m.movieID) AS COUNT FROM moviedata m LEFT JOIN moviegenre g ON g.genreTypeID = m.genreTypeID WHERE (m.ReleaseMonth BETWEEN 1 AND 2) AND (m.ReleaseYear = 2020) GROUP BY m.genreTypeID';
    connection.query(sql4,function (err,analysis4) {
        if (err) throw err;

        var sql5 = 'SELECT m.movieID, m.movieName, COUNT(DISTINCT bm.bookingMovieID) AS COUNT FROM moviedata m, movieshowtime sh, bookingmovie bm WHERE bm.movieShowtimeID = sh.movieShowtimeID AND sh.movieID = m.movieID GROUP BY m.movieID';
        connection.query(sql5,function (err,analysis5) {
            if (err) throw err;

            var sql7 = 'SELECT b.branchID, b.branchName, COUNT(employeeID) AS Count FROM branch b, employee e WHERE e.branchID = b.branchID GROUP BY b.branchID';
            connection.query(sql7,function (err,analysis7) {
                if (err) throw err;

                var sql8 = 'SELECT b.branchID, b.branchName, p.JobPosition, COUNT(employeeID) AS Count FROM branch b, employee e, position p WHERE e.branchID = b.branchID AND e.positionID = p.positionID GROUP BY b.branchID, p.positionID';
                connection.query(sql8,function (err,analysis8) {
                    if (err) throw err;
                    
                    var sql9 = 'SELECT b.branchID, b.branchName, e.gender, COUNT(employeeID) AS Count FROM branch b, employee e WHERE e.branchID = b.branchID GROUP BY b.branchID, e.gender';
                    connection.query(sql9,function (err,analysis9) {
                        if (err) throw err;

                        var sql10 = 'SELECT s.branchID, branchName , MAX(price) AS highestPrice FROM seatprice s, branch b WHERE s.branchID = b.branchID GROUP BY b.branchID ORDER BY highestPrice DESC';
                        connection.query(sql10,function (err,analysis10) {
                            if (err) throw err;

                            var sql11 = 'SELECT p.price, s.seatType, tt.theaterTypeName FROM seatprice p, seat s, theaterType tt WHERE s.seatID = p.seatID AND p.theatertypeID = tt.theaterTypeID GROUP BY s.seatType, tt.theaterTypeID';
                            connection.query(sql11, function(err,analysis11) {
                                if (err) throw err;

                                var sql12 = 'SELECT b.branchName, tt.theaterTypeName, MIN(price) AS lowestPrice FROM branch b, theater t, theatertype tt, seatprice p WHERE b.branchID = t.branchID AND t.theaterTypeID = tt.theaterTypeID GROUP BY b.branchID, tt.theaterTypeID';
                                connection.query(sql12, function(err,analysis12) {
                                    if (err) throw err;
                                    res.render("admin/adminAnalysis", { title: 'ANALYSIS', topic4:analysis4, topic5:analysis5,topic7:analysis7,topic8:analysis8,topic9:analysis9,topic10:analysis10, topic11:analysis11, topic12:analysis12});
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});


module.exports = router;