/**
 * Created by wangganggang on 16/3/18.
 */

xqsight.nameSpace.reg("xqsight.wechat");

(function(){
    xqsight.wechat.login = function(){

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
            $("#btn_login").on("click",obj.loginFun);
            $("#btn_getcode").on("click",obj.getCodeFun);

            $(document).bind("keyup","＃loginForm input",function(){
                if(xqsight.validata.isPhone($("#telPhone").val())){
                    if(xqsight.validata.strTrimAll($("#validateCode").val()).length > 3){
                        $("#btn_login").removeClass("disabled");
                    }else{
                        $("#btn_login").addClass("disabled");
                    }
                    $("#btn_getcode").removeClass("disabled");
                }else{
                    $("#btn_getcode").addClass("disabled");
                    $("#btn_login").addClass("disabled");
                }
            });
        };

        /** 登陆 **/
        this.loginFun = function(){
            if($("#btn_login").hasClass("disabled"))
                return false;
            xqsight.progress.show();
            $.ajax({
                "url": ctxData + "/wxuser/bxs/save?date=" + new Date().getTime() ,
                data : {"telPhone" : $("#telPhone").val(),
                        "wxUserCode" : $.getUrlParam("openid"),
                        "validateCode" : $("#validateCode").val()},
                "success": function(retData){
                    xqsight.progress.hide();
                    if(retData.status == "0"){
                        $.toast("登陆成功,可以为所欲为了");
                        //微信中关闭当前窗口
                        xqsight.utils.wxDelayCloseWin(1000);
                    }else{
                        $.toast("登陆失败");
                    }
                },
                "dataType": "jsonp",
                "cache": false
            });
        }

        /** 获取验证码 **/
        this.getCodeFun = function(){
            if($("#btn_getcode").hasClass("disabled"))
                return false;
            else
                $.toast("验证码发送成功");
            /**
              xqsight.progress.show();
            $.ajax({
                "url": ctxData + "/wxuser/bxs/save?date=" + new Date().getTime() ,
                data : {"telPhone" : $("#telPhone").val(),
                    "wxUserCode" : $.getUrlParam("openid")},
                "success": function(retData){
                xqsight.progress.hide();
                    if(retData.status == "0"){
                        $.toast("验证码发送成功");
                    }else{
                        $.toast("发送失败");
                    }
                },
                "dataType": "jsonp",
                "cache": false
            });**/
        }

    };

    /**
     * 初始化数据
     */
    $(document).ready(function() {
        login.init();
    });
})();

var login = new xqsight.wechat.login();