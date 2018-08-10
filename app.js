var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	flash = require("connect-flash"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Tool       = require("./models/tool"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seeds")

var commentRoutes    = require("./routes/comments"),
	toolRoutes       = require("./routes/tools"),
	indexRoutes      = require("./routes/index")


//mongoose.connect("mongodb://localhost:27017/OmicsSource",{ useNewUrlParser: true });
mongoose.connect("mongodb://alex:password626@ds119052.mlab.com:19052/omicssource");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/tools",toolRoutes);
app.use("/tools/:id/comments",commentRoutes);

app.listen(process.env.port || 3000, function(){
	console.log("YelpCamp Server Has Started!");
});

// app.listen(process.env.port, process.env.IP, function(){
// 	console.log("OmicsSource Server Has Started!");
// });