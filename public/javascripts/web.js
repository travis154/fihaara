var socket = io.connect('http://localhost:3000');
socket.on('disconnect', function(){
	socket.on('connect',function(){window.location.reload(true);} )
});

$(function(){
	$("#row").click(function(){
		//$('.container').append(jade.render('designer-row'));
		var row = new market.row(4);
		$('#rows').append(row.generate());
		//row.render([2,2],[2,3],[2,1],[2,1],[2,1],[2,1],[2,1]);
		//row.render([2,1],[2,4],[2,2],[2,1],[1,2],[1,2]);
		row.render([2,2],[4,2],[2,1],[2,2],[2,1]);
	})
	
	$("body").on('click','.market-product-box',function(){
		var self = $(this);
		if(!self.hasClass('market-product-box-selected'))
			self.addClass('market-product-box-selected');
		else
			self.removeClass('market-product-box-selected');
	});
	$("body").on('click','.market-product-mergebox',function(){
		var self = $(this), parent = self.parent();
		parent.find('.market-product-box-selected').removeClass('market-product-box-selected').addClass('market-product-box-merged').css('background', randomColor());
	});
});
function randomColor(){
	return 'rgb('+ (Math.random() * 255 << 0.5) +','+ (Math.random() * 255 << 0.5) +','+ (Math.random() * 255 << 0.5) +')'
}
var market = {

	row : function(rows){
		this.rows = rows * 5 || 4 * 5;
		var self = this;
		return {
			generate:function(){
				var ret = [];
				for(var i = 0; i < self.rows; i++){
					var dom = $(jade.render('designer-row'));
					ret.push(dom);
				}
				ret.push($("<button class='btn btn-info market-product-mergebox'>Merge Selected</button>"))
				var parent = $("<div class='design-row' />").append(ret);
				return parent;
			},
			render:function(){
				var width = 188
				  , height = 100;
				for(var i = 0; i < arguments.length; i++){
					console.log(arguments[i]);
					var div = $('<div />');
					div.css({
						display:'inline-block',
						width: width * arguments[i][1],
						height: height * arguments[i][0],
						background:randomColor(),
						float:'left'
					});
					div.text(i)
					$('#sample').append(div).css("font-size",0);
				}
			}
		}
	}
}
