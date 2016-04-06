/**
 * Created by wangganggang on 16/3/18.
 */

xqsight.nameSpace.reg("xqsight.wechat");

(function(){
    xqsight.wechat.promise = function(){

        var ctxData = xqsight.utils.getBxsServerPath();

        /**
         * 申明内部对象
         * @type {xqsight.wechat}
         */
        var obj = this;

        /**
         * 初始化调用 function
         */
        this.init = function() {
            $("#promiseTime").datetimePicker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">选择日期和时间</h1>\
                </header>'
            });

            $("#address").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">选择地址</h1>\
                </header>'
            });

            $("#userName").val($.getUrlParam("userName")=="null" ? "":$.getUrlParam("userName"));
            $("#sex").val($.getUrlParam("sex"));
            $("#btn_save").on("click",obj.savePromiseFun);
        };

        this.savePromiseFun = function(){
            if($("#btn_save").hasClass("disabled"))
                return false;

            xqsight.progress.show();
            $.ajax({
                "url": ctxData + "/promise/bxs/save?date=" + new Date().getTime() ,
                data : {"promiseTime" : $("#promiseTime").val(),
                    "wxUserId" : $.getUrlParam("wxUserId"),
                    "userName" : $("#userName").val(),
                    "sex" : $("#sex").val(),
                    "telPhone" : $.getUrlParam("telPhone"),
                    "fromSource" : "wx","status" : "1",
                    "promiseAddress" : $("#promiseAddress").val(),
                    "promiseAddrDetail" : $("#promiseAddrDetail").val()},
                "success": function(retData){
                    xqsight.progress.hide();
                    if(retData.status == "0"){
                        $("#btn_save").addClass("disabled");
                        $.toast("预约成功，坐享清福了");
                        //微信中关闭当前窗口
                        xqsight.utils.wxDelayCloseWin(1000);
                    }else{
                        $.toast("预约失败");
                    }
                },
                "dataType": "jsonp",
                "cache": false
            });
        }
    };

    /**
     * 初始化数据
     */
    $(document).ready(function() {
        promise.init();
    });
})();

var promise = new xqsight.wechat.promise();