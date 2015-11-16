var statusValue = [{'x':1,'y':20},{'x':2,'y':21},{'x':3,'y':22},{'x':4,'y':23},{'x':5,'y':24},
				   {'x':6,'y':25},{'x':7,'y':26},{'x':8,'y':27},{'x':9,'y':28},{'x':10,'y':29},
				   {'x':11,'y':30},{'x':12,'y':31},{'x':13,'y':32},{'x':14,'y':33},{'x':15,'y':34},
				   {'x':16,'y':35},{'x':17,'y':36},{'x':18,'y':37},{'x':19,'y':38},{'x':20,'y':39},
				   {'x':21,'y':40},{'x':22,'y':41},{'x':23,'y':42},{'x':24,'y':43},{'x':25,'y':44},
				   {'x':26,'y':45},{'x':27,'y':46},{'x':28,'y':47},{'x':29,'y':48},{'x':30,'y':49},
				   {'x':31,'y':50},{'x':32,'y':49},{'x':33,'y':48},{'x':34,'y':47},{'x':35,'y':46},
				   {'x':36,'y':45},{'x':37,'y':44},{'x':38,'y':43},{'x':39,'y':42},{'x':40,'y':41},
				   {'x':41,'y':40},{'x':42,'y':39},{'x':43,'y':38},{'x':44,'y':37},{'x':45,'y':36},
				   {'x':46,'y':35},{'x':47,'y':34},{'x':48,'y':33},{'x':49,'y':32},{'x':50,'y':31},
				   {'x':51,'y':30},{'x':52,'y':29},{'x':53,'y':28},{'x':54,'y':27},{'x':55,'y':26},
				   {'x':56,'y':25},{'x':57,'y':24},{'x':58,'y':23},{'x':59,'y':22},{'x':60,'y':21}
				  ];
var startPoint = {'track':{'x':100,'y':500},
				  'wc':{'x':165,'y':660},
				  'hk':{'x':354,'y':660},
				  'b1':{'x':570,'y':660},
				  'xs':{'x':770,'y':660},
				  'b2':{'x':1017,'y':670}};

$(document).ready(function(){

	$('#wrap').load('./imagepackage/demo.svg',function(){

		$('#wrap > svg').width('100%').height('100%');

		var canvasEle = document.createElement('canvas');
		canvasEle.id = 'demoCanvas';
		canvasEle.width = 1454;
		canvasEle.height = 836;
		var context = canvasEle.getContext('2d');
		$('#wrap').append(canvasEle);

		//运动轨迹订阅
		var trackSubscribe = pubsub.subscribe('status',function(topics,data){
			//获得起始点坐标
			var startObj = startPointCordinate('track');
			var startX = startObj['x'], startY = startObj['y'];
			//获得终止点坐标
			var endObj = convertCordinate(data);
			var endX = endObj['x'], endY = endObj['y'];
			//更新起始点坐标
			startPoint['track'] = endObj;
			//绘制图
			//var canvasElement = document.getElementById('demoCanvas');
			//canvasElement.width = 1454;
			//canvasElement.height = 836;
			drawSolidLine(context,startX,startY,endX,endY);
		});


		//文昌观测点订阅
		var wenchangSubscribe = pubsub.subscribe('status',function(topics,data){
			if(data['x'] <=20){
				//获得起始点坐标
				var startObj = startPointCordinate('wc');
				var startX = startObj['x'], startY = startObj['y'];
				var endObj = convertCordinate(data);
				var endX = endObj['x'], endY = endObj['y'];

				var can = document.getElementById('demoCanvas');
				var ctx = can.getContext('2d');
				drawDashLine(ctx, startX, startY, endX, endY, 5);
			}
		});

		//海口观测点订阅
		var haikouSubscribe = pubsub.subscribe('status',function(topics,data){
			if(data['x'] <=30 && data['x'] >= 10){
				//获得起始点坐标
				var startObj = startPointCordinate('hk');
				var startX = startObj['x'], startY = startObj['y'];
				//获得终止点坐标
				var endObj = convertCordinate(data);
				var endX = endObj['x'], endY = endObj['y'];

				drawDashLine(context, startX, startY, endX, endY, 5);
			}
		});

		//观测船1订阅
		var boat1Subscribe = pubsub.subscribe('status',function(topics,data){
			if(data['x'] <=45 && data['x'] >= 15){
				//获得起始点坐标
				var startObj = startPointCordinate('b1');
				var startX = startObj['x'], startY = startObj['y'];
				//获得终止点坐标
				var endObj = convertCordinate(data);
				var endX = endObj['x'], endY = endObj['y'];

				drawDashLine(context, startX, startY, endX, endY, 5);
			}
		});

		//西沙观测点订阅
		var xishaSubscribe = pubsub.subscribe('status',function(topics,data){
			if(data['x'] <=50 && data['x'] >= 20){
				//获得起始点坐标
				var startObj = startPointCordinate('xs');
				var startX = startObj['x'], startY = startObj['y'];
				//获得终止点坐标
				var endObj = convertCordinate(data);
				var endX = endObj['x'], endY = endObj['y'];

				drawDashLine(context, startX, startY, endX, endY, 5);
			}
		});

		//观测船2订阅
		var boat2Subscribe = pubsub.subscribe('status',function(topics,data){
			if(data['x'] <=60 && data['x'] >= 30){
				//获得起始点坐标
				var startObj = startPointCordinate('b2');
				var startX = startObj['x'], startY = startObj['y'];
				//获得终止点坐标
				var endObj = convertCordinate(data);
				var endX = endObj['x'], endY = endObj['y'];

				drawDashLine(context, startX, startY, endX, endY, 5);
			}
		});

		var count = 0;
		setInterval(function(){
			pubsub.publish('status',statusValue[count]);
			if((++count) == 60){
				count = 0;
				startPoint = {'track':{'x':100,'y':500},
				  'wc':{'x':165,'y':660},
				  'hk':{'x':354,'y':660},
				  'b1':{'x':570,'y':660},
				  'xs':{'x':770,'y':660},
				  'b2':{'x':1017,'y':660}
				};
				$('#demoCanvas').remove();
				canvasEle = document.createElement('canvas');
				canvasEle.id = 'demoCanvas';
				canvasEle.width = 1454;
				canvasEle.height = 836;
				context = canvasEle.getContext('2d');
				$('#wrap').append(canvasEle);
			}
		},1000);

	});
});

/*订阅发布模式*/
var pubsub = {};

(function(q){
	var topics = {};
	var subUid = -1;

	//发布或广播事件，包含特定的topic名称和参数
	q.publish = function(topic,args){

		if(!topics[topic]){
			return false;
		}

		var subscribers = topics[topic],
			len = subscribers ? subscribers.length : 0;

		while(len--){
			subscribers[len].func(topic,args);
		}

		return this;
	}

	//通过特定的名称和回调函数订阅事件，topic/event触发时执行事件
	q.subscribe = function(topic,func){

		if(!topics[topic]){
			topics[topic] = [];
		}

		var token = (++subUid).toString();
		topics[topic].push({
			token:token,
			func:func
		});

		return token;
	}

	//基于订阅上的标记引用，通过特定topic取消订阅
	q.unsubscribe = function(token){
		for(var m in topics){
			if(topics[m]){
				for(var i=0, j=topics[m].length; i<j; i++){
					if(topics[m][i].token === token){
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
	}
})(pubsub);

//获得起始点坐标
function startPointCordinate(location){
	for(var key in startPoint){
		if(key === location){
			return startPoint[key];
		}
	}
}

//坐标换算函数
//高度换算公式为：y = -13.33x + 766.5
//水平换算公式为: y = 20.33x + 79.67
function convertCordinate(data){

	var x = data['x'], y = data['y'];

	return {'y':Math.floor(766.5-13.33*y),'x':Math.floor(79.67+20.33*x)};
}

//绘制虚线函数
function drawDashLine(ctx, x1, y1, x2, y2, dashLength){
      var dashLen = dashLength === undefined ? 5 : dashLength,
      xpos = x2 - x1, //得到横向的宽度;
      ypos = y2 - y1, //得到纵向的高度;
      numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); 
      //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      for(var i=0; i<numDashes; i++){
         if(i % 2 === 0){
             ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
             //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
          }else{
              ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
          }
       }
      ctx.stroke();
      ctx.closePath();
}

//绘制实线函数
function drawSolidLine(ctx,x1,y1,x2,y2){
	ctx.save();
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}