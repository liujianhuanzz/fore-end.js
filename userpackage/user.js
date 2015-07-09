/*常见效果实例*/

/*瀑布流相关函数*/
function initWaterful(images,parent){

	var containerDiv = document.createElement('div');
	containerDiv.id = 'main';
	document.getElementById('testContent').appendChild(containerDiv);

	var oParent = document.getElementById(parent);

	for(var i=0;i<images['data'].length;i++){
		var oBox = document.createElement('div');
		oBox.className = 'box';
		oParent.appendChild(oBox);
		var oPic = document.createElement('div');
		oPic.className = 'pic';
		oBox.appendChild(oPic);
		var oImg = document.createElement('img');
		oImg.src = images['data'][i]['src'];
		oPic.appendChild(oImg);
	}

	setTimeout(waterfull,20);
}

function waterfull(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass('main','box');
	var oBoxw = oBoxs[0].offsetWidth;//获取每个盒子的宽度
	var cols = Math.floor(oParent.clientWidth/oBoxw);//计算总共可以放的列数
	var heightArr = new Array();//用来存放没一列的高度
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			heightArr.push(oBoxs[i].offsetHeight);
		}else{
			//获取heightArr数组中的最小数值，得到下标
			var index = getIndex(heightArr);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = heightArr[index]+'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			heightArr[index] += oBoxs[i].offsetHeight;
		}
	}
}

function getByClass(parent,clsName){
	var elements = new Array();
	var oParent = document.getElementById(parent);
	var allElement = oParent.getElementsByTagName('*');
	for(var i=0;i<allElement.length;i++){
		if(allElement[i].className == clsName){
			elements.push(allElement[i]);
		}
	}
	return elements;
}

function getIndex(arr){
	var minValue = Math.min.apply(null,arr);
	for(var i in arr){
		if(arr[i] == minValue){
			return i;
		}
	}
}
//end of 瀑布流

/*手风琴相关函数*/
function initSFQ(){

	var divEle = document.createElement('div');
	divEle.id = 'subject';
	divEle.className = 'wrapper';
	$('#testContent').append(divEle);

	var ulEle = document.createElement('ul');
	divEle.appendChild(ulEle);

	var fragment = document.createDocumentFragment();
	for(var i=1; i<6; i++){

		var liEle = document.createElement('li');
		var aEle = document.createElement('a');
		liEle.appendChild(aEle);

		var imgEle = document.createElement('img');
		imgEle.src = 'imagepackage/waterful/'+i+'.jpg';
		var iEle1 = document.createElement('i');
		iEle1.className = 'line';
		var iEle2 = document.createElement('i');
		iEle2.className = 'mask';
		aEle.appendChild(imgEle);
		aEle.appendChild(iEle1);
		aEle.appendChild(iEle2);

		fragment.appendChild(liEle);
	}

	ulEle.appendChild(fragment);
	liEle.className = 'big';

	initList();
}

function initList(){
	var outer = document.getElementById('subject');
	var list = outer.getElementsByTagName('li');
	for(var i=0;i<list.length;i++){
		bind(list[i], 'mouseover', mouseoverHandler);
	}
}

function bind(el,eventType,callback){
	el.onmouseover = callback;
}

function mouseoverHandler(e){
	var target = e.target || e.srcElement;
	var outer = document.getElementById('subject');
	var list = outer.getElementsByTagName('li');

	for(var i=0;i<list.length;i++){
		list[i].className = '';
	}

	while(target.tagName != 'LI' && target.tagName != 'BODY'){
		target = target.parentNode;
	}

	target.className = 'big';
}

//end of 手风琴

//弹一个空白容器,测试专用
function popDiv(){
	var ele = document.getElementById('testContainer');
	if(ele){
		$(ele).remove();
	}

	var containerDiv = document.createElement('div');
	containerDiv.id = 'testContainer';
	containerDiv.className = 'windowBody';
	document.body.appendChild(containerDiv);

	var titleDiv = document.createElement('div');
	titleDiv.className = 'windowTitle';
	titleDiv.innerHTML = '测试代码容器';
	containerDiv.appendChild(titleDiv);

	var contentDiv = document.createElement('div');
	contentDiv.id = 'testContent';
	containerDiv.appendChild(contentDiv);

	var imgEle = document.createElement('img');
	imgEle.src = 'imagepackage/close-1.png';
	imgEle.className = 'windowClose';
	titleDiv.appendChild(imgEle);

	$.fe_draggable({
		'element':'#testContainer',
		'handler':'.windowTitle'
	});

	$(imgEle).on('click',function(){
		$('#testContainer').remove();
	});
}
//弹一个注释容器
function popComment(str,leftpx,toppx){
	var eleDiv = document.createElement('div');
	eleDiv.className = 'popComment';
	eleDiv.style.fontSize = '12px';
	eleDiv.style.width = '150px';
	eleDiv.style.height = '200px';
	eleDiv.style.position = 'absolute';
	eleDiv.style.backgroundColor = '#fff';
	eleDiv.style.border = '1px solid #000';
	eleDiv.style.left = leftpx + 'px';
	eleDiv.style.top = toppx + 'px';
	eleDiv.innerHTML = str;
	document.body.appendChild(eleDiv);
}