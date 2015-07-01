/**
 * triangleIndicate v1 - add triangle indicater to a rectagle block
 * 功能： 给矩形框添加指示性的三角箭头
 * Copyright 2015, ZhangDefu - QQ:2240493958,  China ,  http://www.euku.net/
 * 版权所有： 张德福 易优中国
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
 Array.prototype.indexOf = function(e){
  for(var i=0,j; j=this[i]; i++){
    if(j==e){return i;}
  }
  return -1;
}
;(function($){
	$.fn.triangle = function(options){
		if(this.length == 0) return this;
		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).triangle(options)});
			return this;
		}
		// set a reference to our triangle element
		var elem = this;
		var defaults = {
			color:"white",//the backgrond-color of the triangle  三角形的颜色.    
						 //white, blue, yellow, cyan, lime, purple, tomato
			position:"top",//top, bottom, left, right
			unitWidth:26,
			unitHeight:13
		};
		var triangelClass = "triangel";
		var targetClass = "indicate-target";
		var colorAry;
		var init = function(){
			colorAry = new Array(7);
			colorAry[0] = "white";
			colorAry[1] = "lime";
			colorAry[2] = "yellow";
			colorAry[3] = "blue";
			colorAry[4] = "tomato";
			colorAry[5] = "cyan";
			colorAry[6] = "purple";
			
			if(!$(elem).hasClass(targetClass)){
				$(elem).addClass(targetClass);
			}
		}
		init();
				
		var setting = $.extend({}, defaults,  options);
		
		//calculate width and height
		//计算 width 和 height
		var width = setting.unitWidth;
		var height = setting.unitHeight;
		var getSize = function(){//if succeeded ,return true;  else ,return false. //有异常，则返回false. 计算成功，则返回tru
			switch(setting.position){//top, bottom, left, right
				case "top": case "bottom":
					width = setting.unitWidth;
					height = setting.unitHeight;
					break;
				case "left": case "right":
					width = setting.unitHeight;
					height = setting.unitWidth;
					break;
				default:
					return false;
					break;
			}
			return true;
		}
		//calcuate left and top
		//计算 left 和 top
		var left = 0;
		var top = 0;
		var getPosition = function(){//if succeeded ,return true;  else ,return false.  //有异常，则返回false. 计算成功，则返回true
			var widthAll = $(elem).width();
			var heightAll = $(elem).height();
			switch(setting.position){//top, bottom, left, right
				case "top":
					left = (widthAll - setting.unitWidth) / 2;
					top = 0 - setting.unitHeight;
					break;
				case "bottom":
					left = (widthAll - setting.unitWidth) / 2;
					top = heightAll;
					break;
				case "left":
					left = 0 - setting.unitHeight;
					top = (heightAll - setting.unitWidth) / 2;
					break;
				case "right":
					left = widthAll;
					top = (heightAll - setting.unitWidth) / 2;
					break;
				default:
					return false;
					break;
			}
			return true;
		}
		//calculate  background-position
		//计算 background-position
		var backLeft = 0;
		var backTop = 0;
		var getBackgroundPosition = function(){//if succeeded ,return true;  else ,return false. 
			//计算 background-position. 有异常，则返回false. 计算成功，则返回true
			var colorIndex = colorAry.indexOf(setting.color);
			if(colorIndex < 0) return false;
			
			switch(setting.position){//top, bottom, left, right
				case "top":
					backTop = 0 - 2 * setting.unitWidth;
					backLeft = 0 - colorIndex * setting.unitWidth;
					break;
				case "bottom":
					backTop = 0 - (2 * setting.unitWidth + setting.unitHeight);
					backLeft = 0 - colorIndex * setting.unitWidth;
					break;
				case "left":
					backTop = 0;
					backLeft = 0 -colorIndex * setting.unitHeight;
					break;
				case "right":
					backTop = 0 - setting.unitWidth;
					backLeft = 0 - colorIndex * setting.unitHeight;
					break;
				default:
					return false;
					break;
			}
			return true;
		}
		
		var addIndicator = function(){//if succeeded ,return true;  else ,return false.   //成功返回true, 失败返回false
			var newElem = document.createElement("div");
			$(newElem).addClass(triangelClass);
			var isSizeOk = getSize();
			if(!isSizeOk) return false;
			var isBackOk = getBackgroundPosition();
			if(!isBackOk){
				return false;
			}
			var isPositionOk = getPosition();
			if(!isPositionOk){
				return false;
			}
			$(newElem).css("position", "absolute")
				.css("width", width + "px")
				.css("height", height + "px")
				.css("top", top + "px")
				.css("left", left + "px")
				.css("background-position", backLeft + "px " + backTop + "px");
			$(elem).append(newElem);
			
			return true;
		}
		addIndicator();
		
		
		
		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(){
			//elem = this;
			var indicatorElem = $(elem).children("." + triangelClass);
			var isPositionOk = getPosition();
			if(!isPositionOk){
				return false;
			}
			$(indicatorElem).css("top", top + "px")
				.css("left", left + "px");
		}
		$(window).resize(function(){
				resizeWindow();
		});
		
		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */

		
	}
})(jQuery);

