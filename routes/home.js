var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

const query = (data) =>
  new Promise((resolve, reject) =>
    connection.query(data, function (err, results) {
      if (err) {
        return reject(err);
      }
      resolve(results);
    })
  );

router.get("/", async function (req, res) {
  //
  const getAllMovies = "SELECT * FROM moviedata"; // WHERE DAY(CURDATE()) >= ReleaseDay AND DAY(CURDATE()) <= OutDay LIMIT 20"
  const getAllBranchs = "SELECT * FROM branch";
  const getAllgenre = "SELECT * FROM moviegenre";
  const getAlltheatertype = "SELECT * FROM theatertype";
  try {
    const movies = await query(getAllMovies);
    const branchs = await query(getAllBranchs);
    const moviegenre = await query(getAllgenre);
    const theatertype = await query(getAlltheatertype);

    res.render("home", {
      movies,
      branchs,
      moviegenre,
      theatertype,
    });
    // for error
  } catch (err) {
    console.error(err);
    // res.render("time")
    res.sendStatus(500);
  }
  // connection.query(getAllMovies, function (err, doneMovies) {
  //     if (err) {
  //         throw err;
  //     } else {
  //         var getAllBranchs = "SELECT * FROM branch"
  //         connection.query(getAllBranchs, function (err, doneBranchs) {
  //             if (err) {
  //                 throw err;
  //             } else {
  //                 res.render("home", {
  //                     movies: doneMovies,
  //                     branchs: doneBranchs
  //                 });
  //             }
  //         })
  //     }
  // })
});

router.post("/searchMovies", function (req, res) {
  //console.log('asd');
  var moive = req.body.SearchMovie;
  var branch = req.body.SearchBranch;
  var currentDate = '2020-05-09';
  console.log(moive);
  console.log(branch);

  var today = new Date();
  var time = today.toTimeString();
  time = time.split(' ')[0];
  console.log(time);
  var sql_search =
    "SELECT * FROM movieshowtime st,moviedata d,branch b,theater th,theatertype tt,moviegenre g  WHERE g.genreTypeID = .d.genreTypeID AND st.movieID = d.movieID AND d.movieID = '" +
    moive +
    "'  AND st.theaterID = th.theaterID AND th.branchID = b.branchID AND b.branchID = '" +
    branch +
    "' AND th.theaterTypeID = tt.theaterTypeID";

  var sql_2D =
    "SELECT st.movieShowtimeID,st.theaterID,st.showtime as showtime,tt.TheaterTypeName,st.audio FROM movieshowtime st,moviedata d,branch b,theater th,theatertype tt  WHERE st.movieID = d.movieID AND d.movieID = '" +
    moive +
    "'  AND st.theaterID = th.theaterID AND th.branchID = b.branchID AND b.branchID = '" +
    branch +
    "' AND th.theaterTypeID = tt.theaterTypeID AND DATE(showtime) = '" +
    currentDate +
    "'  AND TheaterTypeName = '2D' ORDER BY st.showtime ASC";

    var sql_3D =
    "SELECT st.movieShowtimeID,st.theaterID,st.showtime as showtime,tt.TheaterTypeName,st.audio FROM movieshowtime st,moviedata d,branch b,theater th,theatertype tt  WHERE st.movieID = d.movieID AND d.movieID = '" +
    moive +
    "'  AND st.theaterID = th.theaterID AND th.branchID = b.branchID AND b.branchID = '" +
    branch +
    "' AND th.theaterTypeID = tt.theaterTypeID AND DATE(showtime) = '" +
    currentDate +
    "'  AND TheaterTypeName = '3D' ORDER BY st.showtime ASC";

    var sql_4DX =
    "SELECT st.movieShowtimeID,st.theaterID,st.showtime as showtime,tt.TheaterTypeName,st.audio FROM movieshowtime st,moviedata d,branch b,theater th,theatertype tt  WHERE st.movieID = d.movieID AND d.movieID = '" +
    moive +
    "'  AND st.theaterID = th.theaterID AND th.branchID = b.branchID AND b.branchID = '" +
    branch +
    "' AND th.theaterTypeID = tt.theaterTypeID AND DATE(showtime) = '" +
    currentDate +
    "'  AND TheaterTypeName = '4DX' ORDER BY st.showtime ASC";

    var sql_IMAX =
    "SELECT st.movieShowtimeID,st.theaterID,st.showtime as showtime,tt.TheaterTypeName,st.audio FROM movieshowtime st,moviedata d,branch b,theater th,theatertype tt  WHERE st.movieID = d.movieID AND d.movieID = '" +
    moive +
    "'  AND st.theaterID = th.theaterID AND th.branchID = b.branchID AND b.branchID = '" +
    branch +
    "' AND th.theaterTypeID = tt.theaterTypeID AND DATE(showtime) = '" +
    currentDate +
    "'  AND TheaterTypeName = 'IMAX' ORDER BY st.showtime ASC";

  connection.query(sql_search, function (err, result) {
    if (err) {
      throw err;
    } else {
      connection.query(sql_2D, function (err, result2D) {
        if (err) {
          throw err;
        } else {
          connection.query(sql_3D, function (err, result3D) {
            if (err) {
              throw err;
            } else {
              connection.query(sql_4DX, function (err, result4DX) {
                if (err) {
                  throw err;
                } else {
                  connection.query(sql_IMAX, function (err, resultIMAX) {
                    if (err) {
                      throw err;
                    } else {
                      console.log(result);
                      console.log(time);
                      res.render("time", {
                        currentTime: time,
                        moviesDetial: result[0],
                        S2Ds: result2D,
                        S3Ds: result3D,
                        S4Ds: result4DX,
                        SIMAX: resultIMAX,
                      });
                    }
                  })
                }
              })
            }
          })
        }
      });
    }
  });
});

module.exports = router;
