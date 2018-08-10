var express = require("express");
var router = express.Router({mergeParams: true});
var Tool = require("../models/tool");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=================
// comments routes
//==================

router.get("/new", middleware.isLoggedIn,function(req,res){
	//find tool by id
	Tool.findById(req.params.id, function(err,tool){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {tool: tool});
		}
	});
});

// Coment create route
router.post("/", middleware.isLoggedIn,function(req, res){
	// lookup tool by id
	Tool.findById(req.params.id, function(err,tool){
		if(err){
			console.log(err);
			res.redirect("/tools");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					tool.comments.push(comment);
					tool.save();
					req.flash("success", "Successfully added comment");
					res.redirect("/tools/" + tool._id);
				}
			});
		}
	});
	// create new comment
	// connect new comment to tool
	// redirect tools showpage
});

// Comment edit route

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {tool_id: req.params.id, comment: foundComent});
		}
	});
});

// Comment update
router.put("/:comment_id", middleware.checkCommentOwnership ,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/tools/"+ req.params.id);
		}
	});
});

// Comment Destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership ,function(req,res){
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/tools/" + req.params.id);
		}
	});
});

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCommentOwnership(req, res, next){
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id,function(err, foundComment){
// 			if(err){
// 				res.redirect("back");
// 			} else {
// 				if(foundComment.author.id.equals(req.user._id)){
// 					next();
// 				} else {
// 					res.redirect("back");
// 				}
// 			}
// 		});
// 	} else {
// 		res.redirect("back");
// 	}
// }

module.exports = router;