/*常见效果实例*/

/*瀑布流相关函数*/
function init(images,parent){

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