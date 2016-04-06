/**
 * Created by wangganggang on 16/3/18.
 */

xqsight.nameSpace.reg("xqsight.wechat");

(function(){
    xqsight.wechat.promiseCenter = function(){

        var ctxData = xqsight.utils.getBxsServerPath();

        /**
         * 申明内部对象
         * @type {saicfc.pmpf}
         */
        var obj = this;

        var iDisplayStart = 1,iDisplayLength= 10;

        /**
         * 初始化调用 function
         */
        this.init = function() {
            $('.swipeout').on('swipeout', function (e) {
                alert(e.target);
            });

            obj.loadPromiseInfo();

            obj.cancenPromiseInfo();

            $("#promiseInfo>li").on("click",function(){
                var promiseId = $(this).find(".swipeout-actions-right>a").attr("promiseId");
                window.location.href=xqsight.domain + "/page/promiseDetail.html?promiseId=" + promiseId;
            });
        };

        this.loadPromiseInfo = function(){
            xqsight.progress.show();
            $.ajax({
                "url": ctxData + "/promise/bxs/querybywxusercode?date=" + new Date().getTime() ,
                data : {"iDisplayStart" : iDisplayStart,
                    "iDisplayLength" : iDisplayLength,
                    "wxUserId" : $.getUrlParam("wxUserId")},
                "success": function(retData){
                    xqsight.progress.hide();

                    if(retData.status == "0"){

                        iDisplayStart = iDisplayStart + retData.data.length;

                        $("#promiseInfo").html("");
                        var promiseHrml = "";
                        if(retData.data.length == 0){
                            return false;
                        }

                        $.each(retData.data,function(index,object){
                            var status = "";
                            if(object.status == "0"){
                                status = "已取消";
                            }else if(object.status == "1"){
                                status = "待联系";
                            }else if(object.status == "2"){
                                status = "维修中";
                            }else if(object.status == "3"){
                                status = "已维修";
                            }

                            promiseHrml += '<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner">';
                            promiseHrml += '<div class="item-title">' + xqsight.moment.formatYMDHms(object.promiseTime) + '</div>';
                            promiseHrml += '<div class="item-after">' + status + '</div>';
                            promiseHrml += '</div></div></div><div class="swipeout-actions-right">';
                            promiseHrml += '<a class="bg-warning" promiseId="' + object.promiseId + '">';
                            promiseHrml += '取消</a></div></li>';
                        });
                        $("#promiseInfo").html(promiseHrml);
                    }
                },
                "dataType": "jsonp",
                "cache": false
            });
        }


        this.cancenPromiseInfo = function(){
            $("#promiseInfo").delegate(".swipeout-actions-right>a","click",function(event){
                //阻止事件冒泡
                event.stopPropagation();
                //阻止事件执行 event.preventDefault();
                var promiseId = $(this).attr("promiseId");
                var changeObj = $(this).parent().parent().find(".item-inner>.item-after");
                if(promiseId == undefined)
                    return false;
                    xqsight.win.confirm("确认取消预约吗？",function(btn){
                    if(btn == "yes"){
                        xqsight.progress.show();
                        $.ajax({
                            "url": ctxData + "/promise/bxs/cancel?date=" + new Date().getTime() ,
                            data : {"promiseId" : promiseId,
                                "status" : "0"},
                            "success": function(retData){
                                xqsight.progress.hide();
                                if(retData.status == "0"){
                                    $.toast("取消成功");
                                    $(changeObj).html("已取消");
                                }else{
                                    $.toast(retData.msg);
                                }
                            },
                            "dataType": "jsonp",
                            "cache": false
                        });
                    }
                });

            });
        }

    };

    /**
     * 初始化数据
     */
    $(document).ready(function() {
        promiseCenter.init();
    });
})();

var promiseCenter = new xqsight.wechat.promiseCenter();