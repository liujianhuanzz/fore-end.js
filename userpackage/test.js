//测试拖拽函数
function testDraggable(){

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
}
//测试登录函数
function testLogin(){

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
}
//测试getStyle函数
function testGetStyle(){
	//alert($('#testContent').fe_getStyle('height'));
	$.fe_alert($.fe_getStyle('#testContent','left'));
}
//测试生成Highcharts图表
function testChart(){
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
}
//测试生成表格
function testTable(){
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
}
/*测试生成菜单*/
function testMenu(){
	$('#testContent').children().remove();
}

//测试遮罩锁屏
function testCover(){
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
}

//测试弹框警告
function testAlert(){
	$('#testContent').children().remove();
	$.fe_alert('测试弹框警告');
}

//测试弹框确认
function testConfirm(){
	$('#testContent').children().remove();
	$.fe_confirm('测试弹框确认',function(){
		$.fe_alert('填写确认输入时的实行函数');
	});
}
