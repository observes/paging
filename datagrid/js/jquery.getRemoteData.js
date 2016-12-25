/**
 * Created by Administrator on 2016/9/17.
 */
;(function($){
    // 扩展jquery对象
    $.extend({
        // 提供一个获取远程数据的方法
        getRemoteData:function(url, callback){
            //1、 悄悄的创建一个iframe（小浏览器窗口）
            var $iframe = $("<iframe style='display: none;'></iframe>")
            //2、对iframe添加一个监听，iframe内容加载完毕
            $iframe.on("load",function(){
                //alert("内容加载成功！！");
                //3、 iframe内容加载完毕的监听逻辑
                //    1）找到数据所在位置
                      var $iframeDocument = $(this.contentDocument);
                //    2） 取出数据
                      var jsonStr = $iframeDocument.find("body").text();
                //    3） 把取出的内容，转换成json
                      var data =  $.parseJSON(jsonStr+"");
                //    4） 执行回调
                      callback(data);
                //    5)   干掉iframe
                      $iframe.remove();
                //
            });
            //4、触发事件
                // 添加页面
                $iframe.appendTo("body");
                // 修改iframe的src属性，配置加载地址
                $iframe.attr("src", url);
        }
    })
})(jQuery);
