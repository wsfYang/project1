import 'babel-polyfill'
import Vue from 'vue'

Vue.config.debug = true;
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(Element)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用

Vue.use(VueRouter)
// 引用路由配置文件
import routes from './config/routes'
// 使用配置文件规则
const router = new VueRouter({
    //mode:'history',
    routes
})

import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)

var onPlusReady = function (callback, context = this) {
    if (window.plus) {
        callback.call(context)
    } else {
        document.addEventListener('plusready', callback.bind(context))
    }
}
Vue.mixin({
    beforeCreate() {
        onPlusReady(() => {
            this.plusReady = true
        }, this)
    },
    methods: {
        onPlusReady: onPlusReady
    }
})

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        //return true;
        return (arr[2]);
    } else {
        return false
    }
}

function //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
setCookie(name, value, expiredays) {
    var d = new Date();
    d.setTime(d.getTime() + (expiredays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(name + "=" + value + "; " + expires);
    document.cookie = name + "=" + value + "; " + expires;
}

router.beforeEach((to, from, next) => {
    //NProgress.start();
    /*var hre = window.location.href;
    var code = hre.indexOf("code") <= 0
    if (to.path == '/login' && code) {
        sessionStorage.removeItem('skl_visitor_info');
        let urlNow = encodeURIComponent(HERF + "/#/login");
        let scope = 'snsapi_userinfo';    //snsapi_userinfo   //静默授权 用户无感知
        let appid = APPID;
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}#wechat_redirect`;
        window.location.replace(url);
    } else if (to.path == '/login' || to.path == '/pageChose' || to.path == '/visitorIndex') {
        next();
    } else if (sessionStorage.getItem('skl_visitor_info') == null) {

        var visitorOpenId = getCookie("skl_visitor_openId");
        if (visitorOpenId != false) {
            $.ajax({
                url: HOST + "/visitor/auth/info/findOpenId",
                type: 'Post',
                dataType: 'Json',
                async: false,
                data: {
                    openId: visitorOpenId
                }, success: function (data) {
                    if (data.code == 200) {
                        sessionStorage.setItem("skl_visitor_info", JSON.stringify(data.data));
                        setCookie("skl_visitor_openId", visitorOpenId, 10000);
                        next();
                    } else {
                        let urlNow = encodeURIComponent(HERF + "/#/login");
                        let scope = 'snsapi_userinfo';    //snsapi_userinfo   //静默授权 用户无感知
                        let appid = APPID;
                        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}#wechat_redirect`;
                        window.location.replace(url);
                    }
                }, error: function (res) {
                    console.log(res);
                }
            })
        } else {
            let urlNow = encodeURIComponent(HERF + "/#/login");
            let scope = 'snsapi_userinfo';    //snsapi_userinfo   //静默授权 用户无感知
            let appid = APPID;
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}#wechat_redirect`;
            window.location.replace(url);
        }

    } else {
        next();
    }*/
    next();
})
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})

