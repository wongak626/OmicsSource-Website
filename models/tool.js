var mongoose = require("mongoose");

var toolSchema = new mongoose.Schema({
	name: String,
	url: String,
	description: String,
	version: String,
	input: String,
	output: String,
	opSystem: String,
	language: String,
	//created: String,
	//lastUpdated: String,
	license: String,
	researchArticle: String,
	maintainers: String,
	upvotes: Number,
	software: String,
	database: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});

module.exports = mongoose.model("Tool", toolSchema);