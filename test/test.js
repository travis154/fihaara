var chai = require('chai');
var mongoose = require('mongoose');
var expect = chai.expect;
chai.should();

var randomString = require('random-string');
console.log("obj_" + randomString({length: 20}));
mongoose.connect("mongodb://localhost/market");

var Models = require("../lib/Models");
var Image = Models.Image;

describe('User', function(){
	it("#creates a user");
});


describe('Image', function(){
	var img_id = new mongoose.Types.ObjectId;
	var data = {
		_id:img_id,
		filename:'sunflower.jpg',
		path:'/usr/files/objectid/abc',
		width:500,
		height:60
	};
	var img = new Image(data);
	it("#creates an image", function(done){
		img.save(done);
	});
	it("#path must exist");
});

describe('Shop', function(){
	it("#creates a shop");
});

describe('Product', function(){
	it("#creates a product");
});

describe('Alerts', function(){
	it("#creates alert");
});

describe('Reports', function(){
	it("#creates alert");
});

