var mongoose = require('mongoose');
var image = require('./Image').schema;

exports.schema = new mongoose.Schema({
	name:{
		type: 'string'
	}//,
	//image:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

