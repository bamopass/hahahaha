var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");

//handling user sign in กดlogin check db 
router.post("/welcomeadmin", function (req, res) {
    var email = req.body.email;
    var password = req.body.pass;
    var row;
    if (email && password) {
        connection.query('SELECT * FROM Employee WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.adminEmail = email;
                Object.keys(results).forEach(function(key) {
                    row = results[key];
                    console.log(row.positionID);
                });
                
                if(row.positionID==92){
                    req.session.position = "Admin";
                }
                else{
                    req.session.position = "notAdmin";
                }
                res.redirect("/manageAdmin");
            } else {
                res.render("admin/welcomeadmin",{error:1});
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

//logout routes
router.get("/adminLogout", function (req, res) {
    req.session.destroy();
    res.redirect("/welcomeadmin");
});

router.get('/adminregis', function (req, res) {
    var sqlPosition = 'SELECT * FROM Position';
    connection.query(sqlPosition, function (err, resultPosition) {
        if (err) {
            throw err;
        } else {
            var sqlFood = 'SELECT * FROM food';
            connection.query(sqlFood, function(err, resultFood) {
                if (err) throw err;
                else {
                    var sqlBranch = 'SELECT * FROM Branch';
                    connection.query(sqlBranch, function (err, resultBranch) {
                        if (err) {
                            throw err;
                        } else {
                            console.log(resultPosition);
                            res.render("admin/adminregis",{
                            positions:resultPosition,
                            allergyFood:resultFood,
                            branchs:resultBranch
                            });
                        }
                    })
                }
            })
            
        }
    })
})

router.post("/adminregis", function (req, res) {
    var branchID = req.body.branch;
    var positionID = req.body.position;
    var gender = req.body.gender;
    var citizen_id= req.body.citizen_id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phonenumber;
    var DOBDay = req.body.DOBDay;
    var DOBMonth = req.body.DOBMonth;
    var DOBYear = req.body.DOBYear;

    var foodID = req.body.foodID;
    var foodName = req.body.foodName;
    if (foodID == 0) {
        foodID = null;
        if (foodName != '') {
            var sql_food = "INSERT INTO food (foodName) VALUES ('"+foodName+"')";
            connection.query(sql_food, function (err,result) {
                if(err) throw err;
            })
        }
    }
    
    var sql = "INSERT INTO Employee(branchID,positionID,gender,citizen,fName,LName,email,password,phoneNo,dd,mm,yyyy,foodID) VALUES ('" + branchID + "','" + positionID + "','" + gender + "','" + citizen_id + "','" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + phone + "','" + DOBDay + "','" + DOBMonth + "','" + DOBYear + "',"+foodID+")";
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            if (foodID == null) {
                var sql_update = "UPDATE Employee SET Employee.foodID = (SELECT foodID FROM food WHERE foodName = '"+foodName+"') WHERE Employee.email = '"+email+"' AND foodID IS NULL";
                connection.query(sql_update, function(err) {
                    if (err) throw err;
                })
            }
            console.log("Insert Complete");
            req.session.adminEmail = email;
            if (positionID == 92) {
                req.session.position = "Admin";
            }
            else {
                req.session.position = "notAdmin";
            }
            res.redirect("/manageAdmin");
        }
    })
})



module.exports = router;