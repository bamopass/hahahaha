var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/login', function (req, res) {
    res.render("login",{error:''});
    })

//handling user sign in กดlogin check db
router.post("/login", function (req, res) {
    var email = req.body.email;
    var password = req.body.pass;
    if (email && password) {
        connection.query('SELECT * FROM Member WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.email = email;
                req.session.firstname = results[0].firstName;
                console.log(req.session.email);
                //req.flash("success","welcome to yelp camp" + req.session.username);
                req.flash("success", "Welcome to our Concert Reservation Website   " + req.session.email + "!");

                res.redirect('/');
            } else {
                res.render("login",{error:1});
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

//logout routes
router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

router.get('/regis', function (req, res) {
    var check_email = "SELECT email FROM Member ";
    connection.query(check_email, function (err, foundEmail) {
        if (err) {
            throw err;
        } else {
            res.render("register",{emails:foundEmail});
        }
    })
})


router.post("/regis", function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var citizen_id = req.body.citizen_id;
    var phone = req.body.phonenumber;
    var email = req.body.email;
    var password = req.body.password;
    var DOBDay = req.body.DOBDay;
    var DOBMonth = req.body.DOBMonth;
    var DOBYear = req.body.DOBYear;
    var gender = req.body.gender;
    var memberstatusID = 1;

    var sql = "INSERT INTO Member(fName,LName,gender,citizenID,phone,email,password,dd,mm,yyyy,memberstatusID) values ('" + firstname + "','" + lastname + "','" + gender + "','" + citizen_id + "','" + phone + "','" + email + "','" + password + "','" + DOBDay + "','" + DOBMonth + "','" + DOBYear + "','" + memberstatusID + "')";
    
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("Insert Complete");
            req.session.email = email;
            req.session.firstname = firstname;1
            res.redirect("/");
        }
    })
})


module.exports = router;