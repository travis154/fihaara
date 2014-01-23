

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
		
		
		//sort by height
		var c = 1;
		for(var h in height_sorted){
			var n = Math.pow(2,c) * 10;
			height_sorted[h].forEach(function(e){
				var self = $(e);
				var height = parseInt(e.style.height);
				var new_height = height + n;
				self.css("height", new_height + "px");
			});
			c += 1;
		}
		return;
		
		//add height by level
		var level_sorted = $(".treemap div").sort(function(a,b){
			return parseInt($(a).attr("data-level")) -  parseInt($(b).attr("data-level"));
		});
		var height_sorted = $(".treemap div").sort(function(a,b){
			return parseInt(a.style.height) +  parseInt(b.style.height);
		});
		var clvl;
		var vl=1;
		//var sorted = Array.prototype.reverse.apply(level_sorted);
		var sorted = level_sorted;
		console.log(height_sorted);
		
		var last_height;
		var level;
		
		height_sorted.each(function(){
			var self = $(this);
			var height = parseInt(this.style.height);
			
			if(!last_height){
				last_height = height;
				level = 1;
			}
			
			if(height > last_height){
				level += 1;
			}
			
			var new_height = height + (Math.pow(2,level)*10);
			self.css("height", new_height + "px");
			
		});
		return;
		sorted.each(function(){
			var self = $(this);
			var height = parseInt(this.style.height);
			var level = parseInt(self.attr("data-level"));
			if(!clvl){
				clvl = level;
			}else if(clvl != level){
				clvl = level;
				vl += 10;
			}
			var new_height = height + (Math.pow(2,clvl)*10);
			self.css("height", new_height + "px");
			var data = {
				height:height,
				new_height:new_height,
				height_change:new_height-height,
				//top:top,
				level:level,
				//new_top:new_top
			};
			self.find("small").remove();
			self.append('<small style="font-size:10px">'+JSON.stringify(data,true,3)+'</small>');
			return;
			var top = parseInt(this.style.top);
			var new_top = top + (top == 0 ? top : val+val);
			self.css("top", new_top + "px");
		});
		
		
		return;
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


