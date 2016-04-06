(function ($) {
    $.ajaxSetup({
        complete : function(xhr) {
            if (xhr.status == 302) {
                location.href = xhr.getResponseHeader("Location");
            }
        },
        error : function(){

        }
    });

    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }

})(jQuery);

var xqsight = xqsight || {};

xqsight.domain="http://bxswechat.xqsight.cn/banxiaoshi";

xqsight.common = {


};

/**
 * 日期格式化
 * @type {{formatYMDHms: Function, formatYMD: Function}}
 */
xqsight.moment = {
    formatYMDHms :function(value){
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    formatYMD :function(value){
        return moment(value).format("YYYY-MM-DD");
    }
}

xqsight.utils = {

    wxCloseWin : function(){
        WeixinJSBridge.call('closeWindow')
    },

    wxDelayCloseWin : function(value){
        value = value == undefined ? "100" : value;
        setTimeout('xqsight.utils.wxCloseWin()',value);
    },

    /**
     * 设置当前请求数据的服务器
     * @returns {string}
     */
    getSysServerPath : function(){
        return "http://api.xqsight.cn";
        //return "http://10.116.9.84:8087/system";
    },

    getBxsServerPath : function(){
        return "http://bxswechat.xqsight.cn";
    }


};

//对话框
xqsight.win = {

    //提示框
    alert : function(msg){
        $.alert(msg, '温馨提示');
    },

    //提示框
    alert : function(msg,callbackFun){
        $.alert(msg, '温馨提示',callbackFun);
    },

    //确认对话框
    confirm : function(msg,callbackFun){
        $.confirm(msg,'温馨提示',
            function () {
                callbackFun("yes");
            },
            function () {
                callbackFun("cancel");
            }
        )
    }
};

xqsight.progress = {

    show : function(){
        $.showPreloader();
        setTimeout(function () {
            $.hidePreloader();
        }, 5000);
    },

    hide : function(){
        $.hidePreloader();
    }

}

//命名空间
xqsight.nameSpace = {
    reg : function(s){
        var arr = s.split('.');
        var namespace = window;

        for(var i=0,k=arr.length;i<k;i++){
            if(typeof namespace[arr[i]] == 'undefined'){
                namespace[arr[i]] = {};
            }
            namespace = namespace[arr[i]];
        }
    },

    del : function(s){
        var arr = s.split('.');
        var namespace = window;

        for(var i=0,k=arr.length;i<k;i++){
            if(typeof namespace[arr[i]] == 'undefined'){
                return;
            }else if( k == i+1 ){
                delete  namespace[arr[i]];
                return;
            }else{
                namespace = namespace[arr[i]];
            }
        }
    }
};

xqsight.validata = {
    //前后去空格
    strTrim : function(str){
        return str.replace(/(^\s*)|(\s*$)/g,'');
    },

    //去所有空格
    strTrimAll : function(str){
        return str.replace(/\s/ig,'');
    },

    //是不是手机号码
    isPhone : function(str){
        var reg = /^1\d{10}$/;
        return reg.test(str);
    },

    isEmail : function(str){
        var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return reg.test(str);
    },
    //15位和18位身份证号码的基本校验
    isUserIdentity : function(str){
        var reg = /^\d{15}|(\d{17}(\d|x|X))$/;
        return reg.test(str);
    }
};
