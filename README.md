# 轮播插件(slider)
### 第一步：引入css ，同时把nav.png放到你的图片文件夹下面，如果你的图片文件夹的名称不是images,还要修改样式表中图片的路径
```html
<link rel="stylesheet" type="text/css" href="css/slider.css"/>
```
### 第二步：引入jq库
```html
<script src="http://cdn.bootcss.com/jquery/1.11.0/jquery.js" type="text/javascript" charset="utf-8"></script>
```
### 第三步：引入插件
```html
<script src="js/tyslide.js" type="text/javascript" charset="utf-8"></script>
```
### 第四部：需要做轮播的地方放入html结构
```html
<div class="pptbox" id="aa">
	<ul class="innerwrapper">
		<li><a href="#"><img src="img/ppt_05.jpg"/></a></li>
		<li><a href="#"><img src="img/ppt_05.jpg"/></a></li>
		<li><a href="#"><img src="img/ppt_05.jpg"/></a></li>
	</ul>
	<ul class="controls">
		<li class="current">1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	<span class="btnleft"></span>
	<span class="btnright"></span>
</div>
```
### 第五步：配置插件参数，调用插件方法
```javascript
<script type="text/javascript">
	var opts={
			boxh:430,//盒子的高度
			w:1000,//盒子的宽度
			h:430,//图片的高度
			isShow:true,//是否显示控制器
			isShowBtn:true,//是否显示左右按钮
			controltop:0,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
			controlsW:22,//控制按钮宽度
			controlsH:22,//控制按钮高度
			radius:11//控制按钮圆角度数
	};
	$("#aa").myslide(opts);
</script>
```
