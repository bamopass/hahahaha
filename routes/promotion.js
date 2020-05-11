var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/promotion', function (req, res) {
    res.render("promotion");
    })

module.exports = router;