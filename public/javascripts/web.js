

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
		
		var level = box.attr("data-level");
		level = parseInt(level);
		
		var element1 = $("<div />");
		element1.attr("data-level", level+1);
		element1.css("width",  sub_width + "px");
		element1.css("height", sub_height + "px");
		element1.css("top", top);
		element1.css("left", left);
		element1.append(btn);

		var element2 = $("<div />");
		element2.attr("data-level", level+1);
		element2.css("width",  sub_width + "px");
		element2.css("height", sub_height + "px");
		element2.css("top", sub_top);
		element2.css("left", sub_left);
		element2.append(btn);
		
		box.remove();
		$(".treemap").append(element1);
		$(".treemap").append(element2);		
	});
	
	$("body").on('click','.height-add, .height-remove', function(){
		var el = $(this);
		var val = el.hasClass("height-add") ? 10 : -10;
		
		$(".treemap div").each(function(){
			var self = $(this);
			var height = parseInt(this.style.height);
			var level = parseInt(self.attr("data-level")) + (top == 0 ? 0 : 1);
			var new_height = height + val;
			self.css("height", new_height + "px");
			return;
			var top = parseInt(this.style.top);
			var new_top = top + (top == 0 ? top : val+val);
			self.css("top", new_top + "px");
			
			var data = {
				height:height,
				new_height:new_height,
				top:top,
				level:level,
				new_top:new_top
			};
			self.find("small").remove();
			self.append('<small>'+JSON.stringify(data,true,3)+'</small>');
		});
		var els = $(".treemap div");
		var position_sorted = _.groupBy(els, function(e){
			return parseInt(e.style.top);
		});
		var add = val;
		delete position_sorted['0'];
		for(var i in position_sorted){
			var arr = position_sorted[i];
			if(arr.length){
				arr.forEach(function(el){
					var self = $(el);
					var level = parseInt(self.attr("data-level"));
					var top = parseInt(el.style.top);
					//has a sibling?
					//is it same height?
					//add sum of its height to mine					
					if(top != 0){
						self.css("top", (top+add) + "px");
					}				
				});
				add = add + val;
				
				/*
				arr.forEach(function(el){
					var self = $(el);
					var height = parseInt(el.style.height);
					var top = parseInt(el.style.top);
					var new_height = height + val;
					self.css("height", new_height + "px");
					var level = parseInt(self.attr("data-level"));
					//has a sibling?
					//is it same height?
					//add sum of its height to mine		
					var nlen = arr.length > 1 ? add * level : add;	
					console.log(nlen);		
					if(top != 0){
						self.css("top", (top+nlen) + "px");
					}				
				});
				*/
			}
		}
	});
	

});

