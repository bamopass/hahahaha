var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/time', function (req, res) {
    res.render("time");
    })

module.exports = router;