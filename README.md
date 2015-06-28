# fore-end.js
******************文件介绍******************************************

包含jspackage开发包文件夹：用于开发代码编写;
	csspackage常用样式文件夹；
	imagepackage常用图片文件夹，比如关闭按钮；
	userpackage用户代码包文件夹：用于使用测试;
	test.html页面：显示resultstest和interfacetest的结果（尚未编写）;

其中，userpackage中的文件，test.js和test.css为测试页面test.html相关样式，
user.js和user.css为模块中与用户相关的样式，可对其中属性和值适当进行修改，不可修改选择器名称；
但是：csspackage中的样式文件为模块自身相关样式，不可轻易对其修改；

******************内容介绍******************************************

--------------jspackage---------------------------

一、fore-end.js中添加fe_draggable方法，调用形式：
	1.实例化调用：$(selector).fe_draggable(object),其中object为可选参数，如果不填则默认$(selector)为handler;如果填入的话，格式为{'handler':handlername},handlername可以传入'.xxx'或者'#xxx'；
	2.静态调用：$.fe_draggable(object),object为必填参数，格式为：{'element':selector,'handler':handlername},
	selector和handlername都按照id或者类的方式传递，'.xxx'或者'#xxx';

二、fore-end.js中添加fe_login方法，调用形式：
	1.实例化调用：$(selector).fe_login(object),其中selector为父容器，object格式为：{'title':title,'type':type,'page':page,'success':callback,'failure':callback},title为系统名称;type为提交方式，get和post;page为提交目标页面;success和failure分别登录成功和失败后需要执行的回调函数;
	2.静态调用：$.fe_login(object),其中selector为父容器，object格式为：{'parent':selector,'title':title,'type':type,'page':page,'success':callback,'failure':callback},selector为父容器,title为系统名称;type为提交方式，get和post;page为提交目标页面;success和failure分别登录成功和失败后需要执行的回调函数;
	3.说明：此方法需要与后台进行交互，传递给后台的数据名为username和password,验证成功则返回true，验证失败则返回false；

三、fore-end.js中添加fe_getStyle方法，调用形式：
	1.实例化调用：$(selector).fe_getStyle(attr);
	2.静态调用：$.fe_getStyle(selector,attr);其中selector为id选择器或者类选择器或者元素，即'#xxx'或者'.xxx'或者element,attr为属性名;

四、fore-end.js中添加fe_addTable方法，调用形式：
	1.实例化调用：$(selector).fe_addTable(obj);
	2.静态调用：$.fe_addTable(selector,obj);其中selector为id选择器或者类选择器或者元素，即'#xxx'或者'.xxx'或者element,
		obj的格式为：{
						'tableHeader':['参数一','参数二','参数三','参数四','参数五',...],
						'tableContent':{
										 '1':['参数一','参数二','参数三','参数四','参数五',...],
										 '2':['参数一','参数二','参数三','参数四','参数五',...],
										 '3':['参数一','参数二','参数三','参数四','参数五',...],
										 '4':['参数一','参数二','参数三','参数四','参数五',...],
										 '5':['参数一','参数二','参数三','参数四','参数五',...]
										 ...
										},
						'callback':function(){alert('填写执行函数')}
					}

五、fore-end.js中添加fe_drawChart方法，调用形式：
	1.实例化调用：$(selector).fe_drawChart(obj);
	2.静态调用：$.fe_drawChart(selector,obj);其中selector为id选择器或者类选择器或者元素，即'#xxx'或者'.xxx'或者element,
		obj的格式为：{
						'type':'column',
						'title':'xxx曲线图',
						'xValue':[1,2,3,4,5,6,7,8,9,10],
						'series':[271.9,272.1,272.1,271.9,270.5,271.9,272.1,272.1,271.9,270.5]
					}
		其中type为图表类型，title为图表名称，xValue为横轴值，series为纵轴的值，两者长度须一致，此处较复杂，尽量根据不同的需求结合highcharts
		手册来进行自己写，这里只是当作一个实例给出
	附：常用highcharts图表类型：折线图：line,曲线图：spline,点状图：scatter,柱状图：column,折线区域图：area,曲线区域图：areaspline;

--------------csspackage--------------------------

fore-end.css引入字体，2015.6.14
fore-end.css添加一般浮动窗样式,2015.6.18

--------------userpackage-------------------------

test.js添加测试拖拽函数，2015.6.17
test.js添加测试登录函数,2015.6.18
test.js添加测试图标按钮,2015.6.21
test.js添加测试getStyle函数，2015.6.25
test.css添加测试拖拽按钮，2015.6.17
test.css添加测试登录按钮,2015.6.18
test.css添加测试getStyle和测试图表按钮, 2015.6.25

user.css添加用户定义登录样式，2015.6.18
--------------imagepackage------------------------

close-1.png 关闭图标(空心);
close-2.png 关闭图标(实心);
download.png 下载图标;
login.png 登录图标;
searchIn.png 搜索图标;

--------------fontpackage------------------------
常用字体
********************************************************************
