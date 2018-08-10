var mongoose = require("mongoose");
var Tool     = require("./models/tool");
var Comment  = require("./models/comment");

var data = [
	{
		name: "GATK",
		url: "https://github.com/broadinstitute/gatk",
		description: "testing gatk"
	},
	{
		name: "Galaxy",
		url: "https://github.com/galaxyproject",
		description: "testing galaxy"
	},
	{
		name: "cBioPortal",
		url: "https://github.com/cBioPortal",
		description: "testing cBioPortal"
	}
]

function seedDB(){
	// Remove all campgrounds
	Tool.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed tools!");
			// add a few comments
		// data.forEach(function(seed){
		// 	Tool.create(seed, function(err,tool){
		// 		if(err){
		// 			console.log(err)
		// 		} else {
		// 			console.log("added a tool")
		// 			Comment.create(
		// 			{
		// 				text: "This software is great!",
		// 				author: "Homer"
		// 			}, function(err,comment){
		// 				if(err){
		// 					console.log(err);
		// 				} else {
		// 					tool.comments.push(comment);
		// 					tool.save();
		// 					console.log("created new comment");
		// 				}
		// 			});
					
		// 		}
		// 	});
		// });
	});
	// add a few tools
	//Tool.create({})
}

module.exports = seedDB;