


//测试拖拽函数
function testDraggable(){

	if($('.testDiv')){
		$('.testDiv').remove();
	}

	var containerDiv = document.createElement('div');
	containerDiv.style.cssText = 'width:500px;height:300px;border:1px solid red;position:absolute;top:0;left:0;';
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

	$(containerDiv).fe_draggable('.titleDiv');
}