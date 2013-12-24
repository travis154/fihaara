var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	filename:{
		type:'string', 
		required:true
	},
	path:{
		type:'string', 
		required:true
	},
	width:{
		type:'string', 
		required:true
	},
	height:{
		type:'string', 
		required:true
	},
	dimensions:[{
		name:'string', //thumb, grayscaled, etc...
		dimension:{
			width:'number',
			height:'number',
		},
		path:'string',
		filename:'string'	
	}]
});
var model = mongoose.model("images", schema);

exports.schema = schema;
exports.model = model;
