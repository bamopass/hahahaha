var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var flash        = require("connect-flash");
var session = require('express-session');
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");



//customer route
var home = require("./routes/home");
var auth = require("./routes/auth");
var promotion = require("./routes/promotion");
var cinema = require("./routes/cinema");
var movie = require("./routes/movie");

//admin route
var welcomeadmin = require("./routes/admin/welcomeadmin");
var adminregis = require("./routes/admin/adminAuth");
var manageAdmin = require("./routes/admin/manageAdmin");
var adminaddmovies = require("./routes/admin/adminaddMovie");
var adminaddseatprices = require("./routes/admin/adminaddseatprices");
var adminAnalysis = require("./routes/admin/adminAnalysis");
var adminaddbranch = require("./routes/admin/adminaddbranch");
var adminaddtheatertype = require("./routes/admin/adminaddtheatertype");
var adminaddgenre = require("./routes/admin/adminaddgenre");



var time = require("./routes/time");
var bookingmovies = require("./routes/bookingmovies")


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());;
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("JS"));
app.use(flash());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.use(function(req,res,next){
    res.locals.currentUser_email = req.session.email;
    res.locals.currentUser_firstName = req.session.firstname;
    res.locals.currentAdmin = req.session.adminEmail;
    res.locals.currentPosition = req.session.position;
    
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    next();
 })

    
app.use("/", home);
app.use("/", auth);
app.use("/", promotion);
app.use("/", cinema);
app.use("/", movie);
app.use("/", welcomeadmin);
app.use("/", adminregis);
app.use("/", manageAdmin);
app.use("/", adminaddmovies)
app.use("/", adminaddseatprices)
app.use("/", time)
app.use("/", bookingmovies)
app.use("/", adminAnalysis)
app.use("/", adminaddbranch)
app.use("/", adminaddtheatertype)
app.use("/", adminaddgenre)


app.use(express.static(__dirname + '/views'));



 var server = app.listen(3000,function(){
 console.log("We have started our server on port 3000");
});



