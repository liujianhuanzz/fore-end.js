//测试拖拽函数
function testDraggable(){

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
	静态调用
	$.fe_login({
		'parent':'#testContent',
		'title':'xxx系统'
	});*/

	$('#testContent').fe_login({'title':'模块化测试'});//实例化调用
}