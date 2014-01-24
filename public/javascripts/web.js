

$(function(){

	//Treemap algorithm contributed by Azwad
	var btn = '<button type="button" style="cursor:col-resize" class="resize-horizontal">divide horizontal</button><button type="button" style="cursor:row-resize" class="resize-vertical">divide vertical</button>';
	$("body").on('click', '.resize-horizontal, .resize-vertical', function(e){
		var type = $(this).hasClass("resize-horizontal") ? "horizontal" : "vertical";
		
		var box = $(this).parent();
		var height = box.get(0).style.height;
		var width = box.get(0).style.width;
		var top = box.get(0).style.top;
		var left = box.get(0).style.left;
			
		height = parseInt(height);
		width = parseInt(width);
		top = parseInt(top);
		left = parseInt(left);
		
		var sub_width = type == "vertical" ? width/2 : width;
		var sub_height = type == "horizontal" ? height/2 : height;
		var sub_top = type == "horizontal" ? top + sub_height : top;
		var sub_left = type == "vertical" ? left + sub_width : left;
		
		var level = box.attr("data-level");
		level = parseInt(level);
		
		var col = "rgba("+(~~(Math.random() * 255) + 1)+","+(~~(Math.random() * 255) + 1)+","+(~~(Math.random() * 255) + 1)+",0.4)";
		
		var element1 = $("<div />");
		element1.attr("data-level", level+1);
		element1.css("width",  sub_width + "px");
		element1.css("height", sub_height + "px");
		element1.css("top", top);
		element1.css("left", left);
		element1.css("background", col);
		element1.append(btn);

		var element2 = $("<div />");
		element2.attr("data-level", level+1);
		element2.css("width",  sub_width + "px");
		element2.css("height", sub_height + "px");
		element2.css("top", sub_top);
		element2.css("left", sub_left);
		element2.css("background", col);
		element2.append(btn);
		
		var sibling = ~~(Math.random()*50000000);
		element1.attr("data-sibling", sibling);
		element2.attr("data-sibling", sibling);
		
		box.remove();
		$(".treemap").append(element1);
		$(".treemap").append(element2);		
	});
	$("body").on('click','.height-add, .height-remove', function(){
		var el = $(this);
		var val = el.hasClass("height-add") ? 10 : -10;
		var els = $(".treemap div");
		var position_sorted = _.groupBy(els, function(e){
			return parseInt(e.style.top);
		});
		var height_sorted = _.groupBy(els, function(e){
			return parseInt(e.style.height);
		});
		var level_sorted = _.groupBy(els, function(e){
			return parseInt($(e).attr("data-level"));
		});
		console.log({position:position_sorted, height:height_sorted, level:level_sorted});
		var c = 1;
		for(var h in height_sorted){
			var n = Math.pow(2,c) * val;
			height_sorted[h].forEach(function(e){
				var self = $(e);
				var height = parseInt(e.style.height);
				var top = parseInt(e.style.top);
				var new_height = height + n;
				self.css("height", new_height + "px");
				if(top!=0){
					self.css("top", new_height + "px");
				}
			});
			c += 1;
		}
	});
	

});


