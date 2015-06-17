/*
采用jQuery插件的方式
*/
(function($){
	$.fn.fe_draggable = function(handler){

		var currEleObj = this;
		var handlerEle = $(handler)[0];

		createObject().drag(currEleObj[0],handlerEle);

	};

})(jQuery);

/*
	forn-end对象封装过程
*/
var createObject = function(){
	return new FEObject();
}

function FEObject(){};

/*拖拽*/
FEObject.prototype.drag = function(element,handler){

	var selfWidth = element.offsetWidth;
	var selfHeight = element.offsetHeight;
	var parentWidth = element.parentNode.nodeName == 'BODY' ? window.innerWidth : element.parentNode.clientWidth;
	var parentHeight = element.parentNode.nodeName == 'BODY' ? window.innerHeight : element.parentNode.clientHeight;

	handler.onmousedown = function(e){
		var e = e || window.event;
		event.stopPropagation();
		event.preventDefault();
		var e_top_d = e.clientY;
		var e_left_d = e.clientX;
		var selfTop = element.offsetTop;
		var selfLeft = element.offsetLeft;

		var e_div_top = e_top_d - selfTop;
		var e_div_left = e_left_d - selfLeft;

		handler.onmousemove = function(e){
			e.stopPropagation();
			e.preventDefault();
			var e_left_m = e.clientX;
			var e_top_m = e.clientY;

			if(e_left_m < e_div_left){
				e_left_m = e_div_left;
			}

			if(e_top_m < e_div_top){
				e_top_m = e_div_top;
			}

			if((selfWidth - parentWidth + e_left_m) > e_div_left){
				e_left_m = parentWidth - selfWidth + e_div_left;
			}

			if((selfHeight - parentHeight + e_top_m) > e_div_top){
				e_top_m = parentHeight - selfHeight + e_div_top;
			}

			element.style.top = e_top_m - e_div_top + 'px';
			element.style.left = e_left_m - e_div_left + 'px';
		}

		handler.onmouseup = function(){
			e.stopPropagation();
			e.preventDefault();
			handler.onmousemove = null;
			handler.onmouseup = null;
		}
	}

	return _this;
}
