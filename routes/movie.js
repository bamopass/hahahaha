var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/movie', function (req, res) {
    res.render("movie");
    })

module.exports = router;