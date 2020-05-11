var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");

router.get('/welcomeadmin', function (req, res) {
    res.render("admin/welcomeadmin",{error:''});
    })

module.exports = router;