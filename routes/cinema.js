var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/cinema', function (req, res) {
    res.render("cinema");
    })

module.exports = router;