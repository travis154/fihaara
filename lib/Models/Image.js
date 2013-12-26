var mongoose = require('mongoose');

//shcema
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
		type:'number', 
		required:true
	},
	height:{
		type:'number', 
		required:true
	},
	user_id:{
		type:mongoose.Schema.Types.ObjectId
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

//model
var model = mongoose.model("images", schema);

//schema validations
model.schema.path('filename').validate(
	function(value){
		
	},''
);

exports.schema = schema;
exports.model = model;
