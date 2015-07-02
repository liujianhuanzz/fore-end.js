# fore-end.js
******************文件介绍******************************************

包含jspackage开发包文件夹：用于开发代码编写,最终fore-end.js形成主要文件;
	csspackage常用样式文件夹；
	imagepackage常用图片文件夹，比如关闭按钮；
	userpackage用户代码包文件夹：用于使用测试和一些实例;
	test.html页面：显示resultstest和interfacetest的结果;

其中，userpackage中的文件，test.js和test.css为测试页面test.html相关样式，
user.js其中会添加一下常见的效果代码，不属于框架内容，但是可以查看实例以便于学习，
user.css为模块中与用户相关的样式，可对其中属性和值适当进行修改，不可修改选择器名称；
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

六、fore-end.js中添加fe_lockScreen遮罩锁屏方法，调用形式如下:
	1.实例化调用：$(selector).fe_lockScreen(obj);
	2.静态调用: $.fe_lockScreen(selector,obj);其中selector为id选择器或者类选择器或者元素，即'#xxx'或者'.xxx'或者element,
		obj的格式为：{
						'isHandle':true,
						'noticeWord':'提示话语',
					}
		其中isHandle为是否可操作，此处可操作表示锁屏是否可以手动关闭，还是等待程序关闭，可以手动则传入true，否则传入false，默认为false；
			noticeWord为传入一句提示性话语;

七、fore-end.js中添加fe_alert弹框警告方法替代自带的alert方法，调用形式：$.fe_alert('弹框警告');

八、fore-end.js中添加fe_confirm弹框警告方法替代自带的confirm方法，调用形式：$.fe_confirm('弹框确认',callback);其中callback为确认成功的执行函数



--------------csspackage--------------------------

fore-end.css引入字体，2015.6.14
fore-end.css添加一般浮动窗样式,2015.6.18
fore-end.css添加遮罩锁屏样式,2015.6.29

--------------userpackage-------------------------

test.js添加测试拖拽函数，2015.6.17
test.js添加测试登录函数,2015.6.18
test.js添加测试图标按钮,2015.6.21
test.js添加测试getStyle函数，2015.6.25

user.js添加了瀑布流相关的函数，2015.7.1
user.js添加了手风琴相关的函数，2015.7.2

test.html添加测试拖拽按钮，2015.6.17
test.html添加测试登录按钮,2015.6.18
test.html添加测试getStyle和测试图表按钮, 2015.6.25
test.html添加测试表格按钮, 2015.6.27
test.html添加测试菜单按钮, 2015.6.28
test.html添加测试遮罩锁屏按钮, 2015.6.29
test.html添加测试弹框警告按钮, 2015.6.30
test.html添加测试弹框确认按钮, 2015.7.1
test.html添加瀑布流按钮, 2015.7.1
test.html添加手风琴按钮, 2015.7.2

user.css添加用户定义登录样式，2015.6.18
user.css添加用户定义弹框按钮样式，2015.6.30
--------------imagepackage------------------------

close-1.png 关闭图标(空心);
close-2.png 关闭图标(实心);
download.png 下载图标;
login.png 登录图标;
searchIn.png 搜索图标;
添加了部分图片，用于瀑布流效果，2015.7.1
添加了部分图片，用于手风琴效果，2015.7.2

--------------fontpackage------------------------
常用字体
********************************************************************
