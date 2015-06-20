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
	
	$.getStyle=function(obj,attr){//获取元素的样式属性值
    		if(obj.currentStyle){
		    return parseFloat(obj.currentStyle[attr]);//兼容IE
		    console.log(obj.currentStyle[attr]);
		}else{
		    return parseFloat(getComputedStyle(obj,false)[attr]);//兼容FireFox/Chrome
		    console.log(getComputedStyle(obj,false)[attr])
		}
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

	var _this = this;

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
/*登录页面创建*/
FEObject.prototype.createLoginPage = function(parentEle,titleName){
	/*创建底层容器*/
	var loginDiv = document.createElement('div');
	loginDiv.id = 'loginDiv';
	loginDiv.className = 'windowBody';
	parentEle.appendChild(loginDiv);
	loginDiv.style.left=($.getStyle(parentEle,'width')-$.getStyle(loginDiv,'width'))/2+'px';
	loginDiv.style.top=($.getStyle(parentEle,'height')-$.getStyle(loginDiv,'height'))/2+'px';
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
