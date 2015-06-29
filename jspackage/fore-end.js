/*
采用jQuery插件的方式
*/
(function($){
	$.fn.fe_draggable = function(object){//拖拽实例化方法

		var handler = object === undefined ? this : object['handler'];
		var handlerEle = $(handler);

		$.each(this,function(index, el) {
			handlerEle[index].style.cursor = 'move';
			createObject().drag(this,handlerEle[index]);
		});

	};

	$.fe_draggable = function(object){//拖拽静态方法
		var dragEle = object['element'];
		var handlerEle = object['handler'];

		$(dragEle).fe_draggable({'handler':handlerEle});
	}

	$.fn.fe_login = function(object){//登录实例化方法

		var type = object['type'] === undefined ? 'post' : object['type'];
		var titleName = object['title'] === undefined ? '请添加系统名称' : object['title'];
		var page = object['page'];
		var succ_callback = object['success'];
		var fail_callback = object['failure'];

		$.each(this,function(index,el){
			createObject().createLoginPage(this,titleName).login(type,page,succ_callback,fail_callback);
		});
	}

	$.fe_login = function(object){//登录静态方法

		var type = object['type'] === undefined ? 'post' : object['type'];
		var titleName = object['title'] === undefined ? '请添加系统名称' : object['title'];
		var page = object['page'];
		var succ_callback = object['success'];
		var fail_callback = object['failure'];
		var parentEle = object['parent'] === undefined ? 'body' : object['parent'];

		$(parentEle).fe_login({'title':titleName,'type':type,'page':page,'success':succ_callback,'failure':fail_callback});
	}

    $.fe_getStyle = function(selector,attr){//获取元素的样式属性值静态方法
    	return $(selector).fe_getStyle(attr);    	
    }

    $.fn.fe_getStyle = function(attr){//获取元素的样式属性的实例化方法
    	if(this[0].currentStyle){//兼容IE
    		return parseFloat(this[0].currentStyle[attr]);
    	}else{
    		return parseFloat(window.getComputedStyle(this[0],false)[attr]);//兼容W3C
    	}
    }

    $.fe_addTable = function(selector,obj){//添加表格的静态方法
    	$(selector).fe_addTable(obj);
    }

    $.fn.fe_addTable = function(obj){//添加表格的实例化方法
    	$.each(this,function(index,el){
    		var _this = this;
    		createObject().createTable(_this,obj);
    	});
    }

    $.fe_drawChart = function(selector,obj){//绘制图表的静态方法
    	$(selector).fe_drawChart(obj);
    }

    $.fn.fe_drawChart = function(obj){//绘制图表的实例化方法
    	$.each(this,function(index, el) {
    		var _this = this;
    		createObject().drawChart(_this,obj);
    	});
    }

    $.fe_lockScreen = function(selector,obj){//遮罩锁屏静态方法
    	$(selector).fe_lockScreen(obj);
    }

    $.fn.fe_lockScreen = function(obj){//遮罩锁屏实例化方法
    	$.each(this,function(index, el) {
    		var _this = this;
    		createObject().lockScreen(_this,obj);
    	});
    }

})(jQuery);

/*
	fore-end对象封装过程
*/
var createObject = function(){
	return new FEObject();
}

function FEObject(){};

/*拖拽*/
FEObject.prototype.drag = function(element,handler){

	var _this = this;

	var selfWidth = element.offsetWidth;
	var selfHeight = element.offsetHeight;
	var parentWidth = element.parentNode.nodeName == 'BODY' ? window.innerWidth : element.parentNode.clientWidth;
	var parentHeight = element.parentNode.nodeName == 'BODY' ? window.innerHeight : element.parentNode.clientHeight;

	handler.onmousedown = function(e){
		var e = e || window.event;
		e.stopPropagation();
		e.preventDefault();
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

/*登录页面创建*/
FEObject.prototype.createLoginPage = function(parentEle,titleName){

	/*创建底层容器*/
	var loginDiv = document.createElement('div');
	loginDiv.id = 'loginDiv';
	loginDiv.className = 'windowBody';
	parentEle.appendChild(loginDiv);
	loginDiv.style.left=($.fe_getStyle(parentEle,'width')-$.fe_getStyle(loginDiv,'width'))/2+'px';
	loginDiv.style.top=($.fe_getStyle(parentEle,'height')-$.fe_getStyle(loginDiv,'height'))/2+'px';

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
	$('.windowClose').on('click',function(){
		$(this).parent().remove();
	});

	/*绑定拖动事件*/
	$.fe_draggable({
		'element':'#loginDiv',
		'handler':'#loginDivTitle'
	});

	return this;
}

/*登录点击事件*/
FEObject.prototype.login = function(type,page,succ_callback,fail_callback){

	var userEle = document.getElementById('inputLoginUsername');
	var pwdEle = document.getElementById('inputLoginPassword');

	$('#loginReset').on('click',function(){
		userEle.value = '';
		pwdEle.value = '';
	});

	$('input').on('keydown',function(e){
		if(e.which == 13){//按下回车
			if(userEle.value == '' || pwdEle.value == ''){
				alert('用户名或密码为空');
			}else{
				var name = userEle.value;
				var password = pwdEle.value;
				$.ajax({
					'type':type,
					'data':'username='+name+'&password='+password,
					'url':page,
					'success':function(msg){
						if(msg == true){
							succ_callback;
						}else if(msg == false){
							fail_callback;
						}

					}
				});
			}
		}
	});

	$('#loginSubmit').on('click',function(){
		if(userEle.value == '' || pwdEle.value == ''){
			alert('用户名或密码为空');
		}else{
			var name = userEle.value;
			var password = pwdEle.value;
			$.ajax({
				'type':type,
				'data':'username='+name+'&password='+password,
				'url':page,
				'success':function(msg){
					if(msg == true){
						succ_callback;
					}else if(msg == false){
						fail_callback;
					}

				}
			});
		}
	});
}

/*生成表格*/
FEObject.prototype.createTable = function(container,obj){

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
	for(var i=0, l=tableHeader.length; i<l; i++){
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
	for(var key in tableContent){//遍历有几行
		var contentTr = document.createElement('tr');

		//为行绑定点击事件
		if(window.addEventListener){//W3C
			contentTr.addEventListener('click', callback,false);
		}else if(window.attachEvent){//IE
			contentTr.attachEvent('onclick',callback);
		}
		
		//奇偶行换色
		if(oddOrEven){
			contentTr.className = 'evenTr';
			oddOrEven = false;
		}else{
			contentTr.className = 'oddTr';
			oddOrEven = true;
		}

		//遍历有几列
		for(var i=0, l=tableContent[key].length; i<l; i++){
			var contentTd = document.createElement('td');
			contentTd.className = 'contentTd' + i;
			var contentText = document.createTextNode(tableContent[key][i]);
			contentTd.appendChild(contentText);
			contentTr.appendChild(contentTd);
		}
		contentFragment.appendChild(contentTr);
	}
	tableEle.appendChild(contentFragment);
}

/*绘制图表*/
FEObject.prototype.drawChart = function(container,obj){

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

	if(chart.series.length > 0){
		chart.series[0].remove();
	}else{
		chart.addSeries({'data':chartSeries});
	}

}

/*遮罩锁屏*/
FEObject.prototype.lockScreen = function(container,obj){

	var noticeStr = obj['noticeWord'] === undefined ? '请输入提示信息' : obj['noticeWord'];
	var isHandle = obj['isHandle'] === undefined ? false : obj['isHandle'];

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

	var newNoticeContentDiv = document.createElement('div');
	newNoticeContentDiv.id = 'noticeContentDiv';
	newNoticeDiv.appendChild(newNoticeContentDiv);
	newNoticeContentDiv.innerHTML = noticeStr;

	$.fe_draggable({
		'element':'#noticeDiv',
		'handler':'#noticeTitleDiv'
	});

	if(isHandle){
		var newNoticeCloseImg = document.createElement('img');
		newNoticeCloseImg.id = 'noticeCloseImg';
		newNoticeCloseImg.className = 'windowClose';
		newNoticeCloseImg.src = 'imagepackage/close-1.png';
		newNoticeDiv.appendChild(newNoticeCloseImg);

		$('#noticeCloseImg').on('click',function(){
			$('#noticeCoverLayerDiv').fadeOut('250', function() {
				$('#noticeCoverLayerDiv').remove();
			});
		});
	}
}