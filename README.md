# fore-end.js
******************文件介绍******************************************

包含modulepackage开发包文件夹：用于开发代码编写,最终fore-end.js形成主要文件;
	csspackage常用样式文件夹；
	imagepackage常用图片文件夹，比如关闭按钮；
	userpackage用户代码包文件夹：用于使用测试和一些实例;
	test.html页面：显示resultstest和interfacetest的结果;

其中，userpackage中的文件，test.js和test.css为测试页面test.html相关样式，
user.js其中会添加一下常见的效果代码，不属于框架内容，但是可以查看实例以便于学习，
user.css为模块中与用户相关的样式，可对其中属性和值适当进行修改，不可修改选择器名称；
但是：csspackage中的样式文件为模块自身相关样式，不可轻易对其修改；

******************内容介绍******************************************

--------------modulepackage---------------------------

一、fore-end.js中添加`fe_draggable`方法，调用形式：
	1.实例化调用：`$(selector).fe_draggable(object)`,其中`object`为可选参数，如果不填则默认`$(selector)`为`handler`;如果填入的话，格式为`{'handler':handlername},handlername`可以传入`'.xxx'`或者`'#xxx'`；
	2.静态调用：`$.fe_draggable(object)`,`object`为必填参数，格式为：`{'element':selector,'handler':handlername}`,
	`selector`和`handlername`都按照id或者类的方式传递，`'.xxx'`或者`'#xxx'`;

二、fore-end.js中添加`fe_login`方法，调用形式：
	1.实例化调用：`$(selector).fe_login(object)`,其中`selector`为父容器，`object`格式为：`{'title':title,'type':type,'page':page,'success':callback,'failure':callback}`,`title`为系统名称;`type`为提交方式，`get`和`post`;`page`为提交目标页面;`success`和`failure`分别登录成功和失败后需要执行的回调函数;
	2.静态调用：`$.fe_login(object)`,其中`selector`为父容器，`object`格式为：`{'parent':selector,'title':title,'type':type,'page':page,'success':callback,'failure':callback}`,`selector`为父容器,`title`为系统名称;`type`为提交方式，`get`和`post`;`page`为提交目标页面;`success`和`failure`分别登录成功和失败后需要执行的回调函数;
	3.说明：此方法需要与后台进行交互，传递给后台的数据名为`username`和`password`,验证成功则返回`true`，验证失败则返回`false`；

三、fore-end.js中添加`fe_getStyle`方法，调用形式：
	1.实例化调用：`$(selector).fe_getStyle(attr)`;
	2.静态调用：`$.fe_getStyle(selector,attr)`;其中`selector`为id选择器或者类选择器或者元素，即`'#xxx'`或者`'.xxx'`或者`element`,`attr`为属性名;

四、fore-end.js中添加`fe_addTable`方法，调用形式：
	1.实例化调用：`$(selector).fe_addTable(obj)`;
	2.静态调用：`$.fe_addTable(selector,obj)`;其中`selector`为id选择器或者类选择器或者元素，即`'#xxx'`或者`'.xxx'`或者`element`,
		`obj的格式为：{
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
					}`

五、fore-end.js中添加`fe_drawChart`方法，调用形式：
	1.实例化调用：`$(selector).fe_drawChart(obj)`;
	2.静态调用：`$.fe_drawChart(selector,obj)`;其中`selector`为id选择器或者类选择器或者元素，即`'#xxx'`或者`'.xxx'`或者`element`,
		`obj的格式为：{
						'type':'column',
						'title':'xxx曲线图',
						'xValue':[1,2,3,4,5,6,7,8,9,10],
						'series':[271.9,272.1,272.1,271.9,270.5,271.9,272.1,272.1,271.9,270.5]
					}`
		其中`type`为图表类型，`title`为图表名称，`xValue`为横轴值，`series`为纵轴的值，两者长度须一致，此处较复杂，尽量根据不同的需求结合highcharts
		手册来进行自己写，这里只是当作一个实例给出
	附：常用highcharts图表类型：折线图：line,曲线图：spline,点状图：scatter,柱状图：column,折线区域图：area,曲线区域图：areaspline;

六、fore-end.js中添加`fe_lockScreen`遮罩锁屏方法，调用形式如下:
	1.实例化调用：`$(selector).fe_lockScreen(obj)`;
	2.静态调用: `$.fe_lockScreen(selector,obj)`;其中`selector`为id选择器或者类选择器或者元素，即`'#xxx'`或者`'.xxx'`或者`element`,
		`obj的格式为：{
						'isHandle':true,
						'noticeWord':'提示话语',
					}`
		其中`isHandle`为是否可操作，此处可操作表示锁屏是否可以手动关闭，还是等待程序关闭，可以手动则传入`true`，否则传入`false`，默认为`false`；`noticeWord`为传入一句提示性话语;

七、fore-end.js中添加`fe_alert`弹框警告方法替代自带的alert方法，调用形式：`$.fe_alert('弹框警告')`;

八、fore-end.js中添加`fe_confirm`弹框警告方法替代自带的confirm方法，调用形式：`$.fe_confirm('弹框确认',callback)`;其中`callback`为确认成功的执行函数

九、fore-end.js中添加`fe_addMenu`生成菜单方法,调用方法：
	1.实例化调用：`$(selector).fe_addMenu(obj)`;
	2.静态调用: `$.fe_addMenu(selector,obj)`;其中`selector`为id选择器或者类选择器或者元素，即`'#xxx'`或者`'.xxx'`或者`element`,
		`obj的格式为:{
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
					}`
		最多支持三级菜单

十、fore-end.js中添加`fe_unique`数组去重,调用方法：`$.fe_unique(array)`;
十一、fore-end.js中添加`fe_trim`字符串去除两边空格,调用方法：`$.fe_trim(array)`;
十二、fore-end.js中添加`fe_carousel`方法,该功能是一个旋转木马的插件。HTML格式可以参考示例代码，
	  		要点就在`data-setting`的设置以及加上相应的类, 调用形式：`$.carousel()`;


--------------csspackage--------------------------

fore-end.css引入字体，2015.6.14
fore-end.css添加一般浮动窗样式,2015.6.18
fore-end.css添加遮罩锁屏样式,2015.6.29

--------------userpackage-------------------------

test.js添加测试拖拽函数，2015.6.17
test.js添加测试登录函数,2015.6.18
test.js添加测试图标按钮,2015.6.21
test.js添加测试getStyle函数，2015.6.25
test.js添加测试菜单函数，2015.7.4

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
test.html添加数组去重按钮, 2015.7.6
test.html添加字符串去除两边空格按钮, 2015.7.8
test.html添加旋转木马按钮, 2015.7.11

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
添加了部分图片，用于旋转木马，2015.7.11

--------------fontpackage------------------------
常用字体
********************************************************************
