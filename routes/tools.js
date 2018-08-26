var express = require("express");
var router = express.Router();
var Tool = require("../models/tool");
var middleware = require("../middleware");


//INDEX - show all tools
router.get("/", function(req, res){
	console.log(req.user);
	// Get all tools from DB
	Tool.find({}, function(err,alltools){
		if(err){
			console.log(err);
		} else {
			res.render("tools/index", {tools:alltools});
		}
	});
});

//CREATE - add new tool to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get ddata from form and add to tools array
	// redirect back to tools page
	
	var name = req.body.name;
	var url = req.body.url;
	var desc = req.body.description;
	var version = req.body.version;
	var input = req.body.input;
	var output = req.body.output;
	var license = req.body.license;
	var software = req.body.software;
	var database = req.body.database;
	var upvotes = 0;

	var author = {
		id: req.user._id,
		username: req.user.username
	}
	
	var newTool = {name: name, url: url, description: desc, version: version, input: input,
		output: output, license: license, software: software, database: database, author: author,
		upvotes: upvotes};

	// Create a new campground and save to database

	Tool.create(newTool,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/tools");
		}
	});
});

// NEW - show form to create new tool
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("tools/new");
});
/*app.listen(process.env.PORT, process.env.IP, function(){
	console.log("YelpCamp Server Has Started!");
})*/


// SHOW - shows more info about one tool
router.get("/:id",function(req,res){
	// find tool with provided ID 
	Tool.findById(req.params.id).populate("comments").exec(function(err, foundTool){
		if(err){
			console.log(err);
		} else {
			console.log(foundTool);
			// render show template with that tool
			res.render("tools/show",{tool: foundTool});
		}
	});
	// render show template with that tool
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkToolOwnership,function(req,res){
	// is user logged in
		Tool.findById(req.params.id,function(err, foundTool){
			
			res.render("tools/edit",{tool: foundTool});	
		});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkToolOwnership,function(req,res){
	// find and update the correct campground
	
	Tool.findByIdAndUpdate(req.params.id, req.body.tool, function(err, updatedTool){
		if(err){
			res.redirect("/tools");
		} else {
			res.redirect("/tools/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkToolOwnership,function(req,res){
	Tool.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/tools");
		} else {
			res.redirect("/tools");
		}
	});
});

// ADD LIKE
router.post("/:id/like",function(req,res){
	Tool.findById(req.params.id, function(err, foundTool){
		if(err){
			res.redirect("/tools");
		} else {
			console.log("this worked");
			foundTool.upvotes = foundTool.upvotes + 1; 
			foundTool.save();
			res.redirect("/:id");
			
		}
	});
});

module.exports = router;
