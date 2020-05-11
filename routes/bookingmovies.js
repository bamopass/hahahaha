var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");
var middleware = require("../middleware/index");
var {
   isUser
} = middleware;

router.get('/bookingmovies/:movieName/:branchName/:theaterID/:varbuffer/:movieShowtimeID/:theatertype/:audio/select', function (req, res) {
    var movieName = req.params.movieName;
    var branchName = req.params.branchName;
    var theaterID = req.params.theaterID;
    var showtime = req.params.varbuffer;
    var movieShowtimeID = req.params.movieShowtimeID;
    var theatertype = req.params.theatertype;
    var audio = req.params.audio;

    console.log(movieName);
    console.log(branchName);
    console.log(theaterID);
    console.log(showtime);
    console.log(movieShowtimeID);
    console.log(theatertype);
    console.log(audio);
    console.log("sa");

    var get_seat = "SELECT * FROM seat WHERE movieShowtimeID = '" +movieShowtimeID +"' "
    connection.query(get_seat, function (err, resultSeat) {
        if (err) {
          throw err;
        } else {
            console.log(resultSeat[0].position);
            var seat_position = resultSeat[0].position;
            seat_position = seat_position.split(',');
            
            res.render("bookingmovies",{
                movieName:movieName,
                branchName:branchName,
                theaterID:theaterID,
                showtime:showtime,
                movieShowtimeID:movieShowtimeID,
                theatertype:theatertype,
                audio:audio,
                seat:resultSeat[0],
                seat_position:seat_position
            });
        }
    })
})


router.post("/bookingmovies/:movieShowtimeID/:theater/:movie/:showTime",isUser, function (req, res) {
    var movieShowtimeID = req.params.movieShowtimeID;
    var theater = req.params.theater;
    var movie = req.params.movie;
    var showTime = req.params.showTime;
    var reservation = req.body.position;
    var reservation90_135 = req.body.position90;

    console.log('asdas',movieShowtimeID);
    console.log('0-89',reservation);
    console.log('90-135',reservation90_135);
    var position = [
        'A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','A11','A12','A13','A14','A15',
        'B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11','B12','B13','B14','B15',
        'C1','C2','C3','C4','C5','C6','C7','C8','C9','C10','C11','C12','C13','C14','C15',
        'D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15',
        'E1','E2','E3','E4','E5','E6','E7','E8','E9','E10','E11','E12','E13','E14','E15',
        'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15',
        'G1','G2','G3','G4','G5','G6','G7','G8','G9','G10','G11','G12','G13','G14','G15',
        'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15',
        'I1','I2','I3','I4','I5','I6','I7','I8','I9','I10','I11','I12','I13','I14','I15'
            ]
     var get_seat = "SELECT * FROM seat WHERE movieShowtimeID = '" +movieShowtimeID +"' "
    connection.query(get_seat, function (err, resultSeat) {
        if (err) {
          throw err;
        } else {
            var numberOfSeats =0;
            var showPisitionSeats = new Array();
            var originSeat = resultSeat[0].position;
            originSeat = originSeat.split(',');
            console.log('check',originSeat);
            if(reservation){
                for(var i =0 ; i<reservation.length;i++){
                    originSeat[reservation[i]] =1;
                    showPisitionSeats.push(position[reservation[i]]);
                    numberOfSeats++;
                }
            }
            if(reservation90_135){
                for(var i =0 ; i<reservation90_135.length;i++){
                    originSeat[reservation90_135[i]] =1;
                    showPisitionSeats.push(position[reservation90_135[i]]);
                    numberOfSeats++;
                }
            }
            console.log(showPisitionSeats);
            var get_memberId = "SELECT * FROM member WHERE email = '" +req.session.email +"' "
            connection.query(get_memberId, function (err, resultMember) {
                if (err) {
                  throw err;
                } else {
                    var get_seat = "SELECT * FROM seat WHERE movieShowtimeID = '" +movieShowtimeID +"' "
                    connection.query(get_seat, function (err, resultSeat) {
                        if (err) {
                        throw err;
                        } else {
                            var price = resultSeat[0].price * numberOfSeats;
                            var sql = "INSERT INTO bookingmovie (memberID,movieShowtimeID,paymentMethodID,promotionID,amount) VALUES ('"+resultMember[0].memberID +"','"+movieShowtimeID +"',1,4,'"+price +"')";
                            connection.query(sql, function (err, resultSql) {
                                if (err) {
                                throw err;
                                } else {
                                    var sql1 = "INSERT INTO bookingseat (bookingMovieID,seat) VALUES ('"+resultSql.insertId +"','"+showPisitionSeats +"')";
                                    connection.query(sql1, function (err, resultSql1) {
                                        if (err) {
                                        throw err;
                                        } else {
                                            var sql2 = "UPDATE seat SET position = '"+ originSeat+"' WHERE movieShowtimeID = '"+movieShowtimeID +"'";
                                            connection.query(sql2, function (err, resultSql2) {
                                                if (err) {
                                                throw err;
                                                } else {
                                                    var d = new Date();
                                                    var curdate =d.toDateString();
                                                    var curtime =d.toTimeString();
                                                    curtime =  curtime.split(' ')[0];
                                                    console.log(curdate);
                                                    console.log(curtime);
                                                    res.render("aa",{
                                                        member:resultMember[0],
                                                        theater:theater,
                                                        movie:movie,
                                                        Date:curdate,
                                                        time:curtime,
                                                        numberOfSeats:numberOfSeats,
                                                        seat_position:showPisitionSeats,
                                                        price:price,
                                                        showTime:showTime

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
module.exports = router;