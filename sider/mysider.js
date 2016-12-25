(function ($) {
	 $.fn.extend({
	 	"mySlide":function (options) {
		 	//默认值的设置
		 	var defaults={
		 		width:520,
		 		height:280,
		 		isControl:true, // 下面按钮控制按钮
		 		isShowBtn:true  //左右按钮
		 	};
		 	var opts = $.extend(false, defaults, options);
		 		//console.log(defaults)
		 		//console.log(opts)
		 	this.each( function() {
		 		//获取一张图片的高度和宽容度
		 		var imgW =parseInt(opts.width);
		 		var imgH =parseInt(opts.height);
		 		//console.log(imgW,imgH)

		 		//设置可视区的的盒子
		 		$(this).css({"width":imgW ,"height":imgH});

		 		//设置轮播的ul
		 		var firstitem=$(this).find(".silderpic>li:first").clone();//克隆第一个li
		 		var lastitem=$(this).find(".silderpic>li:last").clone();//克隆最后一个li
		 		$(this).find(".silderpic").append(firstitem).prepend(lastitem);//把最后一个li加到最前，最第一个li加到最后
		 		var count  =  $(this).find('#btn>li').length;
		 		var ulWidth  = (count+2)*imgW ;
		 		$(this).find(".silderpic").css({'width':ulWidth,"left":-imgW,"height":imgH});//设置ul
		 		$(this).find(".silderpic>li").css({'width':imgW,"height":imgH});//设置ul>li
		 		$(this).find(".silderpic>li img").css({'width':imgW,"height":imgH});//设置ul>li>img


		 		//设置左右按钮的位置
		 		var  btnTop = (imgH-60)/2; //60为按钮背景图片的大小
		 		$(this).find(".leftbtn").css({'top':btnTop });
		 		$(this).find(".rightbtn").css({'top':btnTop });

		 		//下面控制台的样式
		 		var btnW  = count *(20+10);//20为每个控制按钮的大小 ，右边相聚10px
		 		var btnLeft = (imgW -btnW)/2;
		 		$(this).find('#btn').css({"width":btnW,"left":btnLeft,});

		 		//是否隐藏控制台
		 		if (opts.isControl) {
		 			$(this).find('#btn').show();
		 		} else {
		 			$(this).find('#btn').hide();
		 		}
		 		//是否显示左右按钮
		 		if (opts.isShowBtn) {
		 			$(this).find(".leftbtn").show();
		 			$(this).find(".rightbtn").show()
		 		} else {
		 			$(this).find(".leftbtn").hide();
		 			$(this).find(".rightbtn").hide()
		 		}
		 		var that =$(this);
		 		function playppt (indenx) {
		 			nowIndenx = indenx;
		 			//移动距离
		 			var  leftX = -imgW*nowIndenx;
		 			if(nowIndenx == (count+1)){
		 				nowIndenx =1;
		 			}else if (nowIndenx ==0) {
		 				nowIndenx = count;
		 			}
		 			that.find("#silderpic").animate({"left": leftX}, 1000,function () {
		 				 if (nowIndenx  ==1 ) {
		 				  	that.find("#silderpic").css('left', -imgW);
		 				  } else if(nowIndenx == count){
		 				 	that.find("#silderpic").css('left', -(imgW*count));
		 				  } 
		 			});

		 			//控制小图标
		 			that.find("#btn>li").removeClass('active').eq(nowIndenx-1).addClass('active');
		 		}
		 		
		 		// 当前显示图片
		 		var nowIndenx = 1;
		 		//点击左右切换
		 		that.find(".rightbtn").click(function() {
		 			if(!that.find("#silderpic").is(that.find(":animated"))){
		 				playppt (++nowIndenx);
		 			}
		 		});
		 		that.find(".leftbtn").click(function() {
		 			if(!that.find("#silderpic").is(that.find(":animated"))){
		 				playppt (--nowIndenx);
		 			}
		 		});
		 		//控制小图标移动
		 		that.find("#btn>li").click(function() {
		 			var thisIndenx = that.find("#btn>li").index($(this));
		 			if(!that.find("#silderpic").is(that.find(":animated"))){
		 					playppt (thisIndenx+1);	
		 			}
		 		});
		 		//自动轮播  
		 		var flag= true;
		 		that.hover(function() {
		 				flag = false ;
		 		}, function() {
		 				flag = true;
		 		});

		 		 var timer=setInterval(function () {
		 			 if(flag && !that.find("#silderpic").is(that.find(":animated"))){
		 			 	//console.log(flag)
		 				 playppt (++nowIndenx);
		 			 }
		 		},2000)
		 	});
	 	}
	 }); 
})(jQuery);