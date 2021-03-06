/*
采用jQuery插件的方式
*/
(function ($) {
	$.fn.fe_draggable = function (object) {//拖拽实例化方法

		var handler = object === undefined ? this : object['handler'], 
		    handlerEle = $(handler);

		$.each(this, function (index, el) {
			handlerEle[index].style.cursor = 'move';
			createObject().drag(this, handlerEle[index]);
		});

	};

	$.fe_draggable = function (object) {//拖拽静态方法
		var dragEle = object['element'], 
		    handlerEle = object['handler'];

		$(dragEle).fe_draggable({'handler':handlerEle});
	}

	$.fn.fe_login = function (object) {//登录实例化方法

		var type = object['type'] === undefined ? 'post' : object['type'];
		var titleName = object['title'] === undefined ? '请添加系统名称' : object['title'];
		var page = object['page'];
		var succ_callback = object['success'];
		var fail_callback = object['failure'];

		$.each(this, function (index, el) {
			createObject().createLoginPage(this, titleName).login(type, page, succ_callback, fail_callback);
		});
	}

	$.fe_login = function (object) {//登录静态方法

		var type = object['type'] === undefined ? 'post' : object['type'];
		var titleName = object['title'] === undefined ? '请添加系统名称' : object['title'];
		var page = object['page'];
		var succ_callback = object['success'];
		var fail_callback = object['failure'];
		var parentEle = object['parent'] === undefined ? 'body' : object['parent'];

		$(parentEle).fe_login({'title':titleName, 'type':type, 'page':page, 'success':succ_callback, 'failure':fail_callback});
	}

    $.fe_getStyle = function (selector, attr) {//获取元素的样式属性值静态方法
    	return $(selector).fe_getStyle(attr);    	
    }

    $.fn.fe_getStyle = function (attr) {//获取元素的样式属性的实例化方法
    	if(this[0].currentStyle) {//兼容IE
    		return parseFloat(this[0].currentStyle[attr]);
    	}else{
    		return parseFloat(window.getComputedStyle(this[0], false)[attr]);//兼容W3C
    	}
    }

    $.fe_addTable = function (selector, obj) {//添加表格的静态方法
    	$(selector).fe_addTable(obj);
    }

    $.fn.fe_addTable = function (obj) {//添加表格的实例化方法
    	$.each(this, function (index, el) {
    		var _this = this;
    		createObject().createTable(_this, obj);
    	});
    }

    $.fe_drawChart = function (selector, obj) {//绘制图表的静态方法
    	$(selector).fe_drawChart(obj);
    }

    $.fn.fe_drawChart = function (obj) {//绘制图表的实例化方法
    	$.each(this, function (index, el) {
    		var _this = this;
    		createObject().drawChart(_this, obj);
    	});
    }

    $.fe_lockScreen = function (selector, obj) {//遮罩锁屏静态方法
    	$(selector).fe_lockScreen(obj);
    }

    $.fn.fe_lockScreen = function (obj) {//遮罩锁屏实例化方法
    	$.each(this, function (index, el) {
    		var _this = this;
    		createObject().popDiv(_this).lockScreen(obj);
    	});
    }

    $.fe_alert = function (str) {//弹框警告方法
    	createObject().popDiv('body').alert(str);
    }

    $.fe_confirm = function (str, callback) {//弹框确认方法
    	createObject().popDiv('body').confirm(str, callback);
    }

    $.fe_addMenu = function (selector, obj) {//生成菜单静态方法
    	$(selector).fe_addMenu(obj);
    }

    $.fn.fe_addMenu = function (obj) {//生成菜单的实例化方法
    	$.each(this, function (index, el) {
    		var _this = this;
    		createObject().addMenu(_this, obj, 'first');
    	});
    }

    $.fe_unique = function(arr){//数组去重
    	return createObject().unique(arr);
    }

    $.fe_trim = function(str){//去除字符串两端空格
    	return createObject().trim(str);
    }

    $.fe_carousel = function(){
    	Carousel.init($(".J_Poster"));
    }

})(jQuery);

/*
	fore-end对象封装过程
*/
var createObject = function () {
	return new FEObject();
}

function  FEObject() {};

FEObject.prototype = {
	/*拖拽*/
	drag:function (element, handler) {

		var _this = this;

		var selfWidth = element.offsetWidth;
		var selfHeight = element.offsetHeight;
		var parentWidth = element.parentNode.nodeName == 'BODY' ? window.innerWidth : element.parentNode.clientWidth;
		var parentHeight = element.parentNode.nodeName == 'BODY' ? window.innerHeight : element.parentNode.clientHeight;

		handler.onmousedown = function (e) {
			var e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var e_top_d = e.clientY;
			var e_left_d = e.clientX;
			var selfTop = element.offsetTop;
			var selfLeft = element.offsetLeft;

			var e_div_top = e_top_d - selfTop;
			var e_div_left = e_left_d - selfLeft;

			handler.onmousemove = function (e) {
				e.stopPropagation();
				e.preventDefault();
				var e_left_m = e.clientX;
				var e_top_m = e.clientY;

				if(e_left_m < e_div_left) {
					e_left_m = e_div_left;
				}

				if(e_top_m < e_div_top) {
					e_top_m = e_div_top;
				}

				if((selfWidth - parentWidth + e_left_m) > e_div_left) {
					e_left_m = parentWidth - selfWidth + e_div_left;
				}

				if((selfHeight - parentHeight + e_top_m) > e_div_top) {
					e_top_m = parentHeight - selfHeight + e_div_top;
				}

				element.style.top = e_top_m - e_div_top + 'px';
				element.style.left = e_left_m - e_div_left + 'px';
			}

			handler.onmouseup = function () {
				e.stopPropagation();
				e.preventDefault();
				handler.onmousemove = null;
				handler.onmouseup = null;
			}
		}

		return _this;
	}, 
	/*登录页面创建*/
	createLoginPage:function (parentEle, titleName) {
		var _this = this;

		/*创建底层容器*/
		var loginDiv = document.createElement('div');
		loginDiv.id = 'loginDiv';
		loginDiv.className = 'windowBody';
		parentEle.appendChild(loginDiv);
		loginDiv.style.left=($.fe_getStyle(parentEle, 'width')-$.fe_getStyle(loginDiv, 'width'))/2+'px';
		loginDiv.style.top=($.fe_getStyle(parentEle, 'height')-$.fe_getStyle(loginDiv, 'height'))/2+'px';

		/*创建题目容器*/
		var titleDiv = document.createElement('div');
		titleDiv.id = 'loginDivTitle';
		titleDiv.className = 'windowTitle';
		titleDiv.innerHTML = titleName;
		loginDiv.appendChild(titleDiv);

		/*创建关闭按钮*/
		var imgEle = document.createElement('img');
		imgEle.id = 'loginClose';
		imgEle.className = 'windowClose';
		imgEle.src = 'imagepackage/close-1.png';
		loginDiv.appendChild(imgEle);

		/*创建内容容器*/
		var conDiv = document.createElement('div');
		conDiv.id = 'loginContent';
		loginDiv.appendChild(conDiv);

		/*登录结果信息显示*/
		var logTit = document.createElement('div');
		logTit.id = 'loginTitle';
		var imgEleLogin = document.createElement('img');
		imgEleLogin.src = 'imagepackage/login.png';
		var infoDiv = document.createElement('div');
		infoDiv.id = 'inputLoginERROR';
		infoDiv.style.cssText = 'float:right; color:red;';
		conDiv.appendChild(logTit);
		logTit.appendChild(imgEleLogin);
		logTit.appendChild(infoDiv);

		/*表单区域*/
		var formEle = document.createElement('form');
		formEle.id = 'loginForm';
		//formEle.action = page;
		//formEle.method = type;
		conDiv.appendChild(formEle);

		/*表单中用户名区域*/
		var userDiv = document.createElement('div');
		userDiv.id = 'loginUsername';
		var userSpan =document.createElement('span');
		userSpan.innerHTML = '用户名　';
		var userInput = document.createElement('input');
		userInput.id = 'inputLoginUsername';
		userInput.name = 'text1';
		userInput.type = 'text';
		formEle.appendChild(userDiv);
		userDiv.appendChild(userSpan);
		userDiv.appendChild(userInput);

		/*表单中密码区域*/
		var passwordDiv = document.createElement('div');
		passwordDiv.id = 'loginPassword';
		var passwordSpan =document.createElement('span');
		passwordSpan.innerHTML = '密　码　';
		var passwordInput = document.createElement('input');
		passwordInput.id = 'inputLoginPassword';
		passwordInput.name = 'text1';
		passwordInput.type = 'password';
		formEle.appendChild(passwordDiv);
		passwordDiv.appendChild(passwordSpan);
		passwordDiv.appendChild(passwordInput);

		/*登录和重置按钮*/
		var loginBtn = document.createElement('div');
		loginBtn.id = 'loginSubmit';
		loginBtn.className = 'loginButton';
		loginBtn.innerHTML = '登　录';
		var resetBtn = document.createElement('div');
		resetBtn.id = 'loginReset';
		resetBtn.className = 'loginButton';
		resetBtn.innerHTML = '重　置';
		formEle.appendChild(loginBtn);
		formEle.appendChild(resetBtn);

		/*绑定关闭按钮事件*/
		$('.windowClose').on('click', function () {
			_this.remove($(this).parent());
		});

		/*绑定拖动事件*/
		$.fe_draggable({
			'element':'#loginDiv', 
			'handler':'#loginDivTitle'
		});

		return this;
	}, 
	/*登录点击事件*/
	login:function (type, page, succ_callback, fail_callback) {

		var userEle = document.getElementById('inputLoginUsername');
		var pwdEle = document.getElementById('inputLoginPassword');

		$('#loginReset').on('click', function () {
			userEle.value = '';
			pwdEle.value = '';
		});

		$('input').on('keydown', function (e) {
			if(e.which == 13) {//按下回车
				if(userEle.value == '' || pwdEle.value == '') {
					$.fe_alert('用户名或密码为空');
				}else{
					var name = userEle.value;
					var password = pwdEle.value;
					$.ajax({
						'type':type, 
						'data':'username='+name+'&password='+password, 
						'url':page, 
						'success':function (msg) {
							if(msg == true) {
								succ_callback;
							}else if(msg == false) {
								fail_callback;
							}

						}
					});
				}
			}
		});

		$('#loginSubmit').on('click', function () {
			if(userEle.value == '' || pwdEle.value == '') {
				$.fe_alert('用户名或密码为空');
			}else{
				var name = userEle.value;
				var password = pwdEle.value;
				$.ajax({
					'type':type, 
					'data':'username='+name+'&password='+password, 
					'url':page, 
					'success':function (msg) {
						if(msg == true) {
							succ_callback;
						}else if(msg == false) {
							fail_callback;
						}

					}
				});
			}
		});
	}, 
	/*生成表格*/
	createTable:function (container, obj) {

		//获取表格信息
		var tableHeader = obj['tableHeader'];
		var tableContent = obj['tableContent'];
		var callback = obj['callback'];

		//生成表格
		var tableEle = document.createElement('table');
		tableEle.className = 'standTable';
		tableEle.cellspacing = '0';
		tableEle.cellpadding = '0';
		container.appendChild(tableEle);

		//添加表头信息
		var headTr = document.createElement('tr');
		tableEle.appendChild(headTr);
		var headFragment = document.createDocumentFragment();
		for(var i=0, l=tableHeader.length; i<l; i++) {
			var headTh = document.createElement('th');
			headTh.className = 'headTh'+ i;
			var headText = document.createTextNode(tableHeader[i]);
			headTh.appendChild(headText);
			headFragment.appendChild(headTh);
		}
		headTr.appendChild(headFragment);
		tableEle.appendChild(headTr);

		//添加表格内容
		var contentFragment = document.createDocumentFragment();
		var oddOrEven = true;
		for(var key in tableContent) {//遍历有几行
			var contentTr = document.createElement('tr');

			//为行绑定点击事件
			if(window.addEventListener) {//W3C
				contentTr.addEventListener('click', callback, false);
			}else if(window.attachEvent) {//IE
				contentTr.attachEvent('onclick', callback);
			}
			
			//奇偶行换色
			if(oddOrEven) {
				contentTr.className = 'evenTr';
				oddOrEven = false;
			}else{
				contentTr.className = 'oddTr';
				oddOrEven = true;
			}

			//遍历有几列
			for(var i=0, l=tableContent[key].length; i<l; i++) {
				var contentTd = document.createElement('td');
				contentTd.className = 'contentTd' + i;
				var contentText = document.createTextNode(tableContent[key][i]);
				contentTd.appendChild(contentText);
				contentTr.appendChild(contentTd);
			}
			contentFragment.appendChild(contentTr);
		}
		tableEle.appendChild(contentFragment);
	}, 
	/*绘制图表*/
	drawChart:function (container, obj) {

		var chartType = obj['type'] === undefined ? 'spline' : obj['type'];
		var chartTitle = obj['title'] === undefined ? '' : obj['title'];
		var chartXValue = obj['xValue'] === undefined ? 'datatime' : obj['xValue'];
		var chartSeries = obj['series'];

		$(container).highcharts({//可根据不同的需求配置此处，不可能写全了满足所有需求的
			loading:{
				labelStyle:{
					top:'1%', 
					fontWeight:'bold'
				}
			}, 
			chart:{
				type:chartType, 
				zoomType:'x'
			}, 
			title:{
				text:chartTitle
			}, 
			xAxis:{
				categories:chartXValue
			}, 
			plotOptions:{
				series:{
					allowPointSelect:true, 
					marker:{
						radius:2
					}
				}
			}
		});

		/*添加series绘制图表*/
		var chart = $(container).highcharts();

		if(chart.series.length > 0) {
			chart.series[0].remove();
		}else{
			chart.addSeries({'data':chartSeries});
		}

	}, 
	/*弹框*/
	popDiv:function (container) {
		var _this = this;

		var newCoverDiv =document.createElement('div');
		newCoverDiv.id = 'noticeCoverLayerDiv';
		$(container).append(newCoverDiv);

		var newNoticeDiv = document.createElement('div');
		newNoticeDiv.id = 'noticeDiv';
		newNoticeDiv.className = 'windowBody';
		newCoverDiv.appendChild(newNoticeDiv);

		var newNoticeTitleDiv = document.createElement('div');
		newNoticeTitleDiv.id = 'noticeTitleDiv';
		newNoticeTitleDiv.className = 'windowTitle';
		newNoticeDiv.appendChild(newNoticeTitleDiv);
		newNoticeTitleDiv.innerHTML = '提示';

		$.fe_draggable({
			'element':'#noticeDiv', 
			'handler':'#noticeTitleDiv'
		});

		return _this;

	}, 
	/*遮罩锁屏*/
	lockScreen:function (obj) {
		var _this = this;

		var noticeStr = obj['noticeWord'] === undefined ? '请输入提示信息' : obj['noticeWord'];
		var isHandle = obj['isHandle'] === undefined ? false : obj['isHandle'];

		var newNoticeContentDiv = document.createElement('div');
		newNoticeContentDiv.id = 'noticeContentDiv';
		$('#noticeDiv').append(newNoticeContentDiv);
		newNoticeContentDiv.innerHTML = noticeStr;

		if(isHandle) {
			var newNoticeCloseImg = document.createElement('img');
			newNoticeCloseImg.id = 'noticeCloseImg';
			newNoticeCloseImg.className = 'windowClose';
			newNoticeCloseImg.src = 'imagepackage/close-1.png';
			$('#noticeDiv').append(newNoticeCloseImg);

			$('#noticeCloseImg').on('click', function () {
				_this.remove('#noticeCoverLayerDiv');
			});
		}
	}, 
	/*弹警告窗*/
	alert:function (str) {
		var _this = this;

		var newNoticeContentDiv = document.createElement('div');
		newNoticeContentDiv.id = 'noticeContentDiv';
		$('#noticeDiv').append(newNoticeContentDiv);
		newNoticeContentDiv.innerHTML = str;

		var buttonDiv = document.createElement('div');
		buttonDiv.className = 'popButton';
		buttonDiv.id = 'submitButton';
		buttonDiv.innerHTML = '确认';
		$('#noticeDiv').append(buttonDiv);

		$(buttonDiv).on('click', function () {
			_this.remove('#noticeCoverLayerDiv');
		});
	}, 
	/*弹确认窗*/
	confirm:function (str, trueCallback) {
		var _this = this;

		var newNoticeContentDiv = document.createElement('div');
		newNoticeContentDiv.id = 'noticeContentDiv';
		$('#noticeDiv').append(newNoticeContentDiv);
		newNoticeContentDiv.innerHTML = str;

		var buttonDiv1 = document.createElement('div');
		buttonDiv1.className = 'popButton';
		buttonDiv1.id = 'submitButton';
		buttonDiv1.innerHTML = '确认';
		$('#noticeDiv').append(buttonDiv1);

		var buttonDiv2 = document.createElement('div');
		buttonDiv2.className = 'popButton';
		buttonDiv2.id = 'cancelButton';
		buttonDiv2.innerHTML = '取消';
		$('#noticeDiv').append(buttonDiv2);

		$(buttonDiv1).on('click', function () {
			$('#noticeCoverLayerDiv').remove();
			trueCallback();
		});

		$(buttonDiv2).on('click', function () {
			_this.remove('#noticeCoverLayerDiv');
		});
	}, 
	/*移除元素*/
	remove:function (selector) {
		$(selector).fadeOut('100', function () {
			$(this).remove();
		});
	}, 
	/*生成菜单*/
	addMenu:function (selector, obj, which) {
		var _this = this;

		if(which == 'first') {
			//生成一个菜单容器
			var menuContainer = document.createElement('div');
			menuContainer.id = 'menuDivContent';
			$(selector).append(menuContainer);

			for(var key in obj) {
				//生成标题容器
				var menuItemContainer = document.createElement('div');
				menuItemContainer.className = 'menuSystemDiv';
				$('#menuDivContent').append(menuItemContainer);

				var titleDiv = document.createElement('div');
				titleDiv.className = 'menuSystemTitle';
				menuItemContainer.appendChild(titleDiv);
				//生成标题
				var spanDiv = document.createElement('span');
				spanDiv.className = 'menuSystemSpan';
				spanDiv.innerHTML = key;
				titleDiv.appendChild(spanDiv);
			}

			$('.menuSystemTitle').on('click', function () {
				var childLength = $(this).siblings().length;
				if(childLength == 0) {
					var currMenuItem = this.parentNode.firstChild.firstChild.innerHTML;
					_this.addMenu(this.parentNode, obj[currMenuItem], 'second');
				}else{
					_this.remove($(this).siblings().not('.menuSystemTitle'));
				}
			});
		}else if(which == 'second') {
			for(var key in obj) {
				//生成标题容器
				var menuItemContainer = document.createElement('div');
				menuItemContainer.className = 'menuSubSystemDiv';
				$(selector).append(menuItemContainer);

				var titleDiv = document.createElement('div');
				titleDiv.className = 'menuSubSystemTitle';
				titleDiv.innerHTML = key;
				menuItemContainer.appendChild(titleDiv);

			}

			$('.menuSubSystemTitle').on('click', function () {
				var childLength = $(this).siblings().length;
				if(childLength == 0) {
					var currMenuItem = this.parentNode.firstChild.innerHTML;
					_this.addMenu(this.parentNode, obj[currMenuItem]);
				}else{
					_this.remove($(this).siblings().not('.menuSubSystemTitle'));
				}
			});
		}else{
			for(var key in obj) {
				//生成标题容器
				var menuItemContainer = document.createElement('div');
				menuItemContainer.className = 'menuParaDiv';
				menuItemContainer.innerHTML = key;
				$(selector).append(menuItemContainer);
			}
		}
		
	},
	//数组去重
	unique:function(arr){
		//集中声明
		var oldArr = arr,
			newArr = [oldArr[0]],
			len = arr.length,
			i = 1;

		if(!len) {
			return false;
		}

		//数组去重
		for(;i<len; i++){
			newArr.indexOf(oldArr[i]) < 0 ? newArr.push(oldArr[i]) : '';
		}

		return newArr;
	},
	//字符串去除两端空格
	trim:function(str){
		return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	}
};

/*旋转木马封装*/
var Carousel = function(poster){
		var self = this;
		//保存单个旋转木马对象
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		this.nextBtn  = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.posterItems =poster.find("li.poster-item");
		if(this.posterItems.size()%2==0){
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			this.posterItems = this.posterItemMain.children();
		};
		this.posterFirstItem  = this.posterItems.first();
		this.posterLastItem  = this.posterItems.last();
		this.rotateFlag = true;
		//默认配置参数
		this.setting = {
					"width":1000,			//幻灯片的宽度
					"height":270,				//幻灯片的高度
					"posterWidth":640,	//幻灯片第一帧的宽度
					"posterHeight":270,	//幻灯片第一帧的高度
					"scale":0.9,					//记录显示比例关系
					"speed":500,
					"autoPlay":false,
					"delay":5000,
					"verticalAlign":"middle" //top bottom
				};
		$.extend(this.setting,this.getSetting());
		
		//设置配置参数值
		this.setSettingValue();
		this.setPosterPos();
		//左旋转按钮
		this.nextBtn .click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			};
		});
		//右旋转按钮
		this.prevBtn .click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			};
		});
	//是否开启自动播放
	if(this.setting.autoPlay){
		this.autoPlay();
		this.poster.hover(function(){
			window.clearInterval(self.timer);
			},function(){
			self.autoPlay();
		});
		
	};

};
Carousel.prototype = {
	autoPlay:function(){
		var self = this;
		this.timer = window.setInterval(function(){
			self.nextBtn.click();
		},this.setting.delay);

	},

	//旋转
	carouseRotate:function(dir){
		var _this_  = this;
		var zIndexArr = [];
		//左旋转
		if(dir === "left"){
			this.posterItems .each(function(){
				var self = $(this),
				   prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
				   width = prev.width(),
				   height =prev.height(),
				   zIndex = prev.css("zIndex"),
				   opacity = prev.css("opacity"),
				   left = prev.css("left"),
				   top = prev.css("top");
				zIndexArr.push(zIndex);	
			    self.animate({
	   					width:width,
						height:height,
						//zIndex:zIndex,
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
				});
			});
			//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
			this.posterItems.each(function(i){
				$(this).css("zIndex",zIndexArr[i]);
			});
		}else if(dir === "right"){//右旋转
			this.posterItems .each(function(){
				var self = $(this),
				    next = self.next().get(0)?self.next():_this_.posterFirstItem,
				    width = next.width(),
				    height =next.height(),
				    zIndex = next.css("zIndex"),
				    opacity = next.css("opacity"),
				    left = next.css("left"),
				    top = next.css("top");
			    zIndexArr.push(zIndex);	
				elf.animate({
   					width:width,
					height:height,
					//zIndex:zIndex,
					opacity:opacity,
					left:left,
					top:top
				},_this_.setting.speed,function(){
					_this_.rotateFlag = true;
				});

			});
			//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
			this.posterItems.each(function(i){
				$(this).css("zIndex",zIndexArr[i]);
			});
		};
	},
	//设置剩余的帧的位置关系
	setPosterPos:function(){
			var self = this;
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				level = Math.floor(this.posterItems.size()/2),
				leftSlice =sliceItems.slice(sliceSize);
		
			//设置右边帧的位置关系和宽度高度top
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width-this.setting.posterWidth)/2)/level;
			
			var firstLeft = (this.setting.width-this.setting.posterWidth)/2;
			var fixOffsetLeft = firstLeft+rw;
			//设置左边位置关系
			rightSlice.each(function(i){
				level--;
				rw = rw *self.setting.scale;
				rh = rh *self.setting.scale
				var j = i;
				$(this).css({
					zIndex:level,
					width:rw,
					height:rh,
					opacity:1/(++j),
					left:fixOffsetLeft+(++i)*gap-rw,
					top:self.setVerticalAlign(rh)
				});
			});
			//设置左边的位置关系
			var lw = rightSlice.last().width(),
			    lh =rightSlice.last().height(),
			    oloop = Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(i){
			$(this).css({
				zIndex:i,
				width:lw,
				height:lh,
				opacity:1/oloop,
				left:i*gap,
				top:self.setVerticalAlign(lh)
			});
			lw = lw/self.setting.scale;
			lh = lh/self.setting.scale;
			oloop--;
		});
	},
	//设置垂直排列对齐
	setVerticalAlign:function(height){
		var verticalType  = this.setting.verticalAlign,
				top = 0;
		if(verticalType === "middle"){
			top = (this.setting.height-height)/2;
		}else if(verticalType === "top"){
			top = 0;
		}else if(verticalType === "bottom"){
			top = this.setting.height-height;
		}else{
			top = (this.setting.height-height)/2;
		};
		return top;
	},
	//设置配置参数值去控制基本的宽度高度。。。
	setSettingValue:function(){
		this.poster.css({
			 width:this.setting.width,
			 height:this.setting.height
	    });
		this.posterItemMain.css({
			width:this.setting.width,
			height:this.setting.height
		});
		//计算上下切换按钮的宽度
		var w = (this.setting.width-this.setting.posterWidth)/2;
		//设置切换按钮的宽高，层级关系
		this.nextBtn.css({
			width:w,
			height:this.setting.height,
			zIndex:Math.ceil(this.posterItems.size()/2)
		});
		this.prevBtn.css({
			width:w,
			height:this.setting.height,
			zIndex:Math.ceil(this.posterItems.size()/2)
		});
		
		this.posterFirstItem.css({
			width:this.setting.posterWidth,
			height:this.setting.posterHeight,
			left:w,
			top:0,
			zIndex:Math.floor(this.posterItems.size()/2)
		});
	},
	//获取人工配置参数
	getSetting:function(){
		
		var setting = this.poster.attr("data-setting");
		if(setting&&setting!=""){
			return $.parseJSON(setting);
		}else{
			return {};
		};
	}

};
Carousel.init = function(posters){
	var _this_ = this;
	posters.each(function(){
		new  _this_($(this));
	});
};
window["Carousel"] = Carousel;












































































































































































































































