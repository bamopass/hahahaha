var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;


router.get('/adminaddBranch',isAdmin, function (req, res) {
    var get_branch = 'SELECT * FROM branch';
    connection.query(get_branch,function(err,branchData) {
        if (err) throw err;
        else {
            res.render("admin/adminaddBranch", { title: 'Branch Form', branch:branchData });
        }
    });
});

router.post("/addBranch",isAdmin, function (req,res) {
    var branchName = req.body.branchName;
    var branchAddress = req.body.branchAddress;
    var phoneNo = req.body.phoneNo;

    var sql = "INSERT INTO branch (branchName,branchAddress,phoneNo) VALUES ('"+branchName+"', '"+branchAddress+"', '"+phoneNo+"')";
    connection.query(sql, function(err,result) {
        if (err) throw err;
        else {
            console.log(branchName + " is successfully inserted");
            res.redirect("/manageAdmin");
        }
    });
});
module.exports = router;
