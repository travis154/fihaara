

$(function(){
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
		
		
		var element1 = $("<div />");
		element1.css("width",  sub_width + "px");
		element1.css("height", sub_height + "px");
		element1.css("top", top);
		element1.css("left", left);
		element1.append(btn);

		var element2 = $("<div />");
		element2.css("width",  sub_width + "px");
		element2.css("height", sub_height + "px");
		element2.css("top", sub_top);
		element2.css("left", sub_left);
		element2.append(btn);
		
		box.remove();
		$(".treemap").append(element1);
		$(".treemap").append(element2);		
		
	});
});

