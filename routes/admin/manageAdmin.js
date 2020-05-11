var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");
var middleware = require("../../middleware/index");
var {
    isAdmin
} = middleware;

router.get('/manageAdmin',isAdmin, function (req, res) {
    res.render("admin/manageAdmin");
    })

module.exports = router;

