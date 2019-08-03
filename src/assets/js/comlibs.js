/**
 * Created by doukc on 2015/9/6.
 */

/**
 * 获取cookie值
 * @param cName: cookie Key
 * @returns {*}: cookie Value
 */
function getCookie(cName) {
    if (document.cookie.length > 0) {
        var cStart = document.cookie.indexOf(cName + "=");
        if (cStart != -1) {
            cStart = cStart + cName.length + 1;
            var cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd == -1) {
                cEnd = document.cookie.length;
            }
            return document.cookie.substring(cStart, cEnd);
        }
    }
    return "";
}


function refreshAllTable(tb_name) {
    var mTable = document.getElementById(tb_name);
    var count = document.getElementsByTagName("tr").length;
    for (var i = 1; i < count; i++) {
        mTable.deleteRow(1);
    }
}

function refreshTable(tbName) {
    var cmdStr = "#" + tbName + " tr:gt(0)";
    //console.log(cmdStr);
    $(cmdStr).remove();
}

var Cls = {
    /*静态数据区*/
    loginStatus: 'login',

    createNew: function () {
        var cls = {};
        cls.checkPermission = function (userLevel, htmlLevel) {
            if (userLevel != htmlLevel) {
                alert('permission denied');
                sessionStorage.clear();
                window.location.href = 'index.html';
            }
        };
        return cls;
    }
};

/*封装AJAX方法*/
var ajax = {
    createNew: function () {
        var cls = {};
        cls.ajaxProc = function (sendData, url) {
            var token = getCookie('token');
            var jqXHR = $.ajax({
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(sendData),
                type: 'post',
                timeout: 10000
            });
            return jqXHR;
        };
        cls.ajaxProcWithoutAsync = function (sendData, url) {
            var jqXHR = $.ajax({
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(sendData),
                type: 'post',
                timeout: 10000,
                async: false,
            });
            return jqXHR;
        };
        cls.ajaxProcWithToken = function (sendData, url) {
            var jqXHR = $.ajax({
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(sendData),
                type: 'post',
                timeout: 10000
                /*headers:{
                    'X-APP-TOKEN':sessionStorage.getItem('token')
                }*/
            });
            return jqXHR;
        };
        cls.ajaxProcWithoutContent = function (url) {
            var jqXHR = $.ajax({
                url: url,
                contentType: 'application/json',
                type: 'post',
                timeout: 10000
            });
            return jqXHR;
        };
        return cls;
    }
};

function stateChange(tipName) {
    $("#" + tipName).attr('class', 'text-primary');
    $("#" + tipName).text('加载中');
}

/**
 * 扩充Date的输出格式
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    var o = {
        "Y+": this.getFullYear(), //year
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

/**
 *
 * @param title
 * @param content
 */
function showAlertDialog(title, content) {
    $(".weui_dialog_hd").text(title);
    $(".weui_dialog_bd").text(content);
    $("#confirm_dialog").show();
}

/**
 * 关闭确认框
 **/
function clsDialog() {
    $("#confirm_dialog").hide();
}