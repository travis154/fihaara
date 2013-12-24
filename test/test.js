var chai = require('chai');
var expect = chai.expect;
chai.should();

var Models = require("../lib/Models");
var Image = Models.Image;


describe('Image', function(){
	it("#creates an image", function(){
		var img = new Image();
		img.save(function(err, doc){});
	});
});

