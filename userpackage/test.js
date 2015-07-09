window.onload = function(){
	$("input[value='测试拖拽']").on('mouseenter',MouseEnter.testDraggable);
	$("input[value='测试拖拽']").on('mouseleave',MouseLeave.remove);
}

var Click = {
	//测试拖拽函数
	testDraggable:function (){
		popDiv();

		$('#testContent').children().remove();
		
		if($('.testDiv')){
			$('.testDiv').remove();
		}

		var containerDiv = document.createElement('div');
		containerDiv.style.cssText = 'width:498px;height:300px;border:1px solid red;position:absolute;top:0;left:0;';
		containerDiv.className = 'testDiv';

		var titleDiv = document.createElement('div');
		titleDiv.style.cssText = 'width:100%;height:50px;background-color:#0966a8';
		titleDiv.className = 'titleDiv';

		var contentDiv = document.createElement('div');
		contentDiv.style.cssText = 'width:100%;height:250px;background-color:#fff;';

		var elem = document.getElementById('testContent');
		elem.appendChild(containerDiv);
		containerDiv.appendChild(titleDiv);
		containerDiv.appendChild(contentDiv);

		var containerDiv1 = document.createElement('div');
		containerDiv1.style.cssText = 'width:498px;height:300px;border:1px solid red;position:absolute;top:0;left:500px;';
		containerDiv1.className = 'testDiv';

		var titleDiv1 = document.createElement('div');
		titleDiv1.style.cssText = 'width:100%;height:50px;background-color:#0966a8';
		titleDiv1.className = 'titleDiv';

		var contentDiv1 = document.createElement('div');
		contentDiv1.style.cssText = 'width:100%;height:250px;background-color:#fff;';

		elem.appendChild(containerDiv1);
		containerDiv1.appendChild(titleDiv1);
		containerDiv1.appendChild(contentDiv1);

		//$('.testDiv').fe_draggable({'handler':'.titleDiv'});//实例化调用
		$.fe_draggable({'element':'.testDiv','handler':'.titleDiv'});//静态调用
	},
	//测试登录函数
	testLogin:function (){
		popDiv();

		$('#testContent').children().remove();

		if($('.loginDiv')){
			$('.loginDiv').remove();
		}
		/*
		静态调用*/
		$.fe_login({
			'parent':'#testContent',
			'title':'xxx系统'
		});

		//$('#testContent').fe_login({'title':'模块化测试'});//实例化调用
	},
	//测试getStyle函数
	testGetStyle:function (){
		popDiv();
		//alert($('#testContent').fe_getStyle('height'));
		$.fe_alert($.fe_getStyle('#testContent','left'));
	},
	//测试生成Highcharts图表
	testChart:function (){
		popDiv();
		$('#testContent').children().remove();

		/*静态调用
		$.fe_drawChart('#testContent',{
			'type':'line',
			'title':'xxx曲线图',
			'xValue':[1,2,3,4,5,6,7,8,9,10],
			'series':[271.9,272.1,272.1,271.9,270.5,271.9,272.1,272.1,271.9,270.5]
		});*/

		$('#testContent').fe_drawChart({
			'type':'area',
			'title':'xxx曲线图',
			'xValue':[1,2,3,4,5,6,7,8,9,10],
			'series':[271.9,272.1,275.1,278.9,268.5,271.9,262.1,272.1,271.9,280.5]
		});
	},
	//测试生成表格
	testTable:function (){
		popDiv();
		$('#testContent').children().remove();
		/*静态调用
		$.fe_addTable('#testContent',{
			'tableHeader':['参数一','参数二','参数三','参数四','参数五'],
			'tableContent':{
				'1':['参数一','参数二','参数三','参数四','参数五'],
				'2':['参数一','参数二','参数三','参数四','参数五'],
				'3':['参数一','参数二','参数三','参数四','参数五'],
				'4':['参数一','参数二','参数三','参数四','参数五'],
				'5':['参数一','参数二','参数三','参数四','参数五']
			},
			'callback':function(){alert('填写执行函数')}
		});*/
		$('#testContent').fe_addTable({
			'tableHeader':['参数一','参数二','参数三','参数四','参数五'],
			'tableContent':{
				'1':['参数一','参数二','参数三','参数四','参数五'],
				'2':['参数一','参数二','参数三','参数四','参数五'],
				'3':['参数一','参数二','参数三','参数四','参数五'],
				'4':['参数一','参数二','参数三','参数四','参数五'],
				'5':['参数一','参数二','参数三','参数四','参数五']
			},
			'callback':function(){$.fe_alert('填写执行函数')}
		});
	},
	/*测试生成菜单*/
	testMenu:function (){
		popDiv();
		$('#testContent').children().remove();

		$('#testContent').fe_addMenu({
			'一级菜单1':{
				'二级菜单11':{
					'三级菜单111':{},
					'三级菜单112':{},
					'三级菜单113':{}
				},
				'二级菜单12':{},
				'二级菜单13':{}
			},
			'一级菜单2':{
				'二级菜单21':{},
				'二级菜单22':{},
				'二级菜单23':{}
			},
			'一级菜单3':{
				'二级菜单31':{},
				'二级菜单32':{},
				'二级菜单33':{}
			},
			'一级菜单4':{
				'二级菜单41':{},
				'二级菜单42':{},
				'二级菜单43':{}
			},
			'一级菜单5':{
				'二级菜单51':{},
				'二级菜单52':{},
				'二级菜单53':{}
			}
		});
	},

	//测试遮罩锁屏
	testCover:function (){
		popDiv();
		$('#testContent').children().remove();

		/*实例化调用
		$('#testContent').fe_lockScreen({
			'isHandle':true,
			'noticeWord':'xxxxxxxxxx'
		});*/

		$.fe_lockScreen('#testContent',{
			'isHandle':true,
			'noticeWord':'遮罩锁屏测试用例'
		})
	},

	//测试弹框警告
	testAlert:function (){
		$('#testContent').children().remove();
		$.fe_alert('测试弹框警告');
	},

	//测试弹框确认
	testConfirm:function (){
		$('#testContent').children().remove();
		$.fe_confirm('测试弹框确认',function(){
			$.fe_alert('填写确认输入时的实行函数');
		});
	},
	//瀑布流
	testWaterful:function (){
		popDiv();
		$('#testContent').children().remove();

		var images = {'data':
						[
						{'src':'imagepackage/waterful/1.jpg'},{'src':'imagepackage/waterful/2.jpg'},{'src':'imagepackage/waterful/3.jpg'},{'src':'imagepackage/waterful/4.jpg'},{'src':'imagepackage/waterful/5.jpg'},
					    {'src':'imagepackage/waterful/6.jpg'},{'src':'imagepackage/waterful/7.jpg'},{'src':'imagepackage/waterful/8.jpg'},{'src':'imagepackage/waterful/9.jpg'},{'src':'imagepackage/waterful/10.jpg'},
					    {'src':'imagepackage/waterful/11.jpg'},{'src':'imagepackage/waterful/12.jpg'},{'src':'imagepackage/waterful/13.jpg'},{'src':'imagepackage/waterful/14.jpg'},{'src':'imagepackage/waterful/15.jpg'},
					    {'src':'imagepackage/waterful/16.jpg'},{'src':'imagepackage/waterful/17.jpg'},{'src':'imagepackage/waterful/18.jpg'},{'src':'imagepackage/waterful/19.jpg'},{'src':'imagepackage/waterful/20.jpg'}
						]
					};

		initWaterful(images,'main');
	},
	//手风琴
	testSFQ:function (){
		popDiv();
		$('#testContent').children().remove();
		initSFQ();
	},
	//数组去重
	testUnique:function (){
		popDiv();
		$('#testContent').children().remove();
		var inputEle = document.createElement('input');
		inputEle.type = 'text';
		inputEle.id = 'inputId';
		$('#testContent').append(inputEle);

		var buttonEle = document.createElement('input');
		buttonEle.type = 'button';
		buttonEle.value = '数组去重';
		buttonEle.id = 'buttonId';
		$('#testContent').append(buttonEle);

		buttonEle.onclick = function(){
			var ele = document.getElementById('inputId'),
				val = ele.value,
				valArr = eval(val);

			$.fe_alert($.fe_unique(valArr));


		}
	},
	//字符串去除两端空格
	testTrim:function (){
		popDiv();
		$('#testContent').children().remove();
		var inputEle = document.createElement('input');
		inputEle.type = 'text';
		inputEle.id = 'inputId';
		$('#testContent').append(inputEle);

		var buttonEle = document.createElement('input');
		buttonEle.type = 'button';
		buttonEle.value = '字符串去除两端空格';
		buttonEle.id = 'buttonId';
		$('#testContent').append(buttonEle);

		buttonEle.onclick = function(){
			var ele = document.getElementById('inputId'),
				val = ele.value,
				valArr = eval(val);

			$.fe_alert($.fe_trim(valArr));

		}
	},

	//跟踪简易demo
	testDemo:function (){
		window.open('demo.html');
	}
};

var MouseEnter = {
	//拖拽描述
	testDraggable:function(){
		var leftpx = this.offsetLeft,
			toppx = this.offsetTop;

		var str = '拖拽代码实现:要点就是鼠标事件绑定，包括onmousedown,onmousemove和onmouseup三个事件，而且还要了解拖拽边界控制计算。'+
				  '在实现过程中应该充分了解鼠标事件中的各个属性以及取消默认事件和阻止事件冒泡的兼容性。';
		popComment(str,leftpx,toppx+40);
	}
};

var MouseLeave = {
	remove:function(){
		$('.popComment').fadeOut('100', function() {
			$(this).remove();
		});
	}
};