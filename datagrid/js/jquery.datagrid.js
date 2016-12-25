/**
 * Created by Administrator on 2016/9/18.
 */
/**
  * 插件目的：
 *
 *      根据指定的一个数据url地址，动态生成表格内容
 *
 *      分析：
 *          1、 目标： 要动态显示数据的表格
 *          2、 数据源： 外部的一个url地址
  */
;(function($){
    // 用来缓存远程加载的数据
    var rowDatas=null;
    // 根据数据，使用JSDOM去绘制行信息
    function autoCreateTableRow($grid, datas){
        // 确定要添加的目标
        var $tbody = $grid.find("tbody");
        // 遍历数据集合
        $(datas).each(function(index,obj){
            //  创建tr
            var $tr = $("<tr align='center'></tr>");
            // 建立和缓存数据的关系
            $tr.attr("rowId",index);
            // 获取表格的列头信息
            var $ths = $grid.find("thead th");
            // 遍历th集合，根据th个数，创建td
            $ths.each(function(){
                // 获取th
                var $th = $(this);
                // 取出th上，定义的数据属性名称
                var field = $th.attr("field");
                // 创建td
                var $td = $("<td>"+obj[field]+"</td>"); // 如何让json对象中的属性，和列信息关联起来
                // 把td添加到tr中
                $tr.append($td);
            });
            // 把tr添加到tbody中
            $tbody.append($tr);
        });
    }
    //加载远程数据
    function loadData($grid, url){
        //发起远程加载
        $.getRemoteData(url,function(rs){ // rs代表加载数据后的结果
            //console.debug(rs);
            // 判断结果是否成功
            if(rs.success){
                // 获取响应数据
                var datas = rs.datas;

                // 把加载到数据，缓存到全局
                rowDatas = datas;
                // 使用数据去创建表格的行
                autoCreateTableRow($grid, datas);
            }
        });
    }
    // 定义做事情的对象
    var datagrid = function(options){
        // 获取相关信息（目标表格，数据源地址）
        var $grid = this;
        var url = options.url;
        if(url){
            // 根据数据地址加载数据
            loadData($grid, url);
            // 设置表格参数
            if(options.height){
                $grid.height(options.height)
            }
            if(options.width){
                $grid.width(options.width)
            }
            // 添加grid自定义的 “行右击事件”
            $grid.delegate("tbody tr","mouseup",function(event){
                //console.debug("button:",event.button);// 0~2 【左 -> 中 ->右】
                //console.debug("which:",event.which);// 1~3 【左 -> 中 ->右】
                var $tr = $(this);
                var rowId = $tr.attr("rowId");
                var rowData = rowDatas[rowId];
                if(event.which===3){ // 右键
                    $(this).trigger("rowRightClick", rowData); // 把rowData传递给rowRightClick事件的响应函数使用
                }
            });
            // 判断是否有配置右击事件
            if(options.onRowRightClick){
                // 在初始化时，动态为行添加右击事件
                $grid.delegate("tbody tr","rowRightClick",options.onRowRightClick);
            }
        }
    };
    // 暴露出去
    $.fn.datagrid = datagrid;
})(jQuery);
