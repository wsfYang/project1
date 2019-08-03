<template>
    <div v-on:click="clickOutside($event)">
        <center>
            <div class="icon-face-img-show" v-if="faceImgBase==''" v-on:click="setAvatar">
                <img src="../assets/img/icon-头像.png">
            </div>
            <img v-else class="icon-face-img-show" :src="faceImgBase" v-on:click="setAvatar">
            <input type="file" accept="image/*" capture="camera" mutiple="mutiple"
                   v-on:change="upload()"
                   style="display: none;"
                   id="imgcamera">
            <input type="file" accept="image/*" value="相册" style="display: none" id="imgchose"
                   v-on:change="upload()">
            <mt-actionsheet
                    :actions="actions"
                    v-model="sheetVisible">
            </mt-actionsheet>
        </center>
        <center>
            <div class="input-type">
                <label>姓名</label>
                <input placeholder="请输入您的姓名" v-model="reportInfo.reportPerson">
            </div>
        </center>
        <center>
            <div class="input-type">
                <label>邮箱</label>
                <input placeholder="请输入您的邮箱" v-model="reportInfo.reportPersonEmail">
            </div>
        </center>
        <center>
            <div class="input-type" v-on:click="showSelect($event)">
                <label>报修类型</label>
                <input placeholder="请选择物品的报修类型"  v-model="reportType">
                <div class="select">
                    <ul>
                        <li v-for="info in typeSelect" v-on:click="choseSelectClass(info)">
                            {{info.reportType}}
                        </li>
                    </ul>
                </div>
            </div>
        </center>
        <center>
            <div class="input-type" v-on:click="showSelect($event)">
                <label>备注</label>
                <input placeholder="请输入损坏物品信息备注" v-model="reportInfo.remark">
            </div>
        </center>

        <center>
            <button @click="platformPush(reportInfo)">提交信息</button>
        </center>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import {Popup} from 'mint-ui';
    import {Picker} from 'mint-ui';
    import {EXIF} from '../assets/js/exif/exif.min.js';
    import tagArray from '../assets/js/tag/tagArray.js';
    import request from '../api/request.js';
    /*const clickOutside = {
        // 初始化指令
        bind(el, binding, vnode) {
            function clickHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
            }
            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.__vueClickOutside__ = clickHandler;
            document.addEventListener('click', clickHandler);
        },
        update() {},
        unbind(el, binding) {
            // 解除事件监听
            document.removeEventListener('click', el.__vueClickOutside__);
            delete el.__vueClickOutside__;
        },
    };*/


    let _this;
    export default {
        name: "schoolInfoPlatform",
        data() {
            _this = this;
            return {
                checked: false,
                sheetVisible: false,
                actions: [{
                    name: '拍照',
                    method: this.getCamera	// 调用methods中的函数
                }, {
                    name: '从相册中选择',
                    method: this.getLibrary	// 调用methods中的函数
                }],
                faceImgBase: "",
                reportType: '',
                typeSelect: [],
                departments: "",

                dormitory: "",

                dormitoryNumber: "",
                reportInfo: {
                    reportNum: 'Xyh100215565',
                    reportLocation: '',
                    reportGoodsType: '',
                    reportPerson: '',
                    reportPersonEmail: '',
                    reportPersonWechat: 'xyh9387',
                    remark: '',
                    goodsPhoto: '',
                    createTime: new Date(),
                    status: 0,
                }
            }
        },
        methods: {
            getCamera: function () {
                console.log("打开照相机");
                this.imgChose = 1;
                document.getElementById("imgcamera").click();

            },
            getLibrary: function () {
                console.log("打开相册");
                var file = document.getElementById("imgchose");
                this.imgChose = 0;
                file.click();
            },
            upload() {
                _this.loading = true;
                var file = null;
                if (_this.imgChose == 1) {
                    file = $("#imgcamera")[0].files['0'];
                } else if (_this.imgChose == 0) {
                    file = $("#imgchose")[0].files['0'];
                } else {
                    return;
                }
                //图片方向角 added by lzk
                var Orientation = null;

                if (file) {
                    console.log("正在上传,请稍后...");
                    var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
                    if (!rFilter.test(file.type)) {
                        //showMyTips("请选择jpeg、png格式的图片", false);
                        return;
                    }
                    // var URL = URL || webkitURL;
                    //获取照片方向角属性，用户旋转控制
                    EXIF.getData(file, function () {
                        // alert(EXIF.pretty(this));
                        EXIF.getAllTags(this);
                        //alert(EXIF.getTag(this, 'Orientation'));
                        Orientation = EXIF.getTag(this, 'Orientation');
                        //return;
                    });

                    var oReader = new FileReader();
                    oReader.onload = function (e) {
                        //var blob = URL.createObjectURL(file);
                        //_compress(blob, file, basePath);
                        var image = new Image();
                        image.src = e.target.result;
                        image.onload = function () {
                            var expectWidth = this.naturalWidth;
                            var expectHeight = this.naturalHeight;

                            if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                                expectWidth = 800;
                                expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                            } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                                expectHeight = 1200;
                                expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                            }
                            var canvas = document.createElement("canvas");
                            var ctx = canvas.getContext("2d");
                            canvas.width = expectWidth;
                            canvas.height = expectHeight;
                            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                            var base64 = null;
                            //修复ios

                            //alert(Orientation);
                            if (Orientation != "" && Orientation != 1) {
                                //alert('旋转处理');
                                switch (Orientation) {
                                    case 6://需要顺时针（向左）90度旋转
                                        //alert('需要顺时针（向左）90度旋转');
                                        _this.rotateImg(this, 'left', canvas);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转
                                        //alert('需要顺时针（向右）90度旋转');
                                        _this.rotateImg(this, 'right', canvas);
                                        break;
                                    case 3://需要180度旋转
                                        //alert('需要180度旋转');
                                        _this.rotateImg(this, 'right', canvas);//转两次
                                        _this.rotateImg(this, 'right', canvas);
                                        break;
                                }
                            }
                            base64 = canvas.toDataURL("image/jpeg", 0.5);

                            //uploadImage(base64);
                            let _base64 = base64;
                            _this.faceImgBase = _base64;
                            /*$.ajax({
                                url: HOST + 'invitation/verify',
                                type: 'POST',
                                async: false,
                                data: {img: _base64.split(",")[1]},
                                success: function (res) {
                                    let verify = JSON.parse(res.data);
                                    if (verify.result[0].mouth_normal == true && verify.result[0].eye_normal == true && verify.result[0].no_face == false) {
                                        _this.base64FaceImg = _base64;
                                    } else {
                                        Toast({
                                            message: '质量未达标',
                                        });
                                    }
                                    _this.loading = false;
                                }, error: function (res) {
                                    alert(JSON.stringify(res));
                                    _this.loading = false;
                                }
                            })*/
                        };
                    };
                    oReader.readAsDataURL(file);
                } else {
                    _this.loading = false;
                }
            },
            rotateImg: function (img, direction, canvas) {
                //alert(img);
                //最小与最大旋转方向，图片旋转4次后回到原方向
                var min_step = 0;
                var max_step = 3;
                //var img = document.getElementById(pid);
                if (img == null) return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                var height = img.height;
                var width = img.width;
                //var step = img.getAttribute('step');
                var step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //img.setAttribute('step', step);
                /*var canvas = document.getElementById('pic_' + pid);
                 if (canvas == null) {
                 img.style.display = 'none';
                 canvas = document.createElement('canvas');
                 canvas.setAttribute('id', 'pic_' + pid);
                 img.parentNode.appendChild(canvas);
                 }  */
                //旋转角度以弧度值为参数
                var degree = step * 90 * Math.PI / 180;
                var ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            setAvatar() {
                this.sheetVisible = true;
            },
            imgFace() {

            },
            choseSelectClass(element) {
                _this.reportType = element.reportType;
                _this.reportInfo.reportGoodsType = element.id;
                $(".select").slideUp(200);
            },
            showSelect(document) {
                var element = $(document.target).siblings(".select");
                element.slideDown(200);
                /*element.removeClass("select-hidden");
                element.addClass("select");*/
            },
            clickOutside(e) {
                let sp2 = $(".select")[0];
                if (sp2) {
                    if (!sp2.contains(e.target) && $(e.target).attr("placeholder") == null) {
                        $(".select").slideUp(200);
                    }
                }
            },
            platformPush(item) {
                if (_this.verifyForm(item)) {
                    $.ajax({
                        url: "http://xyh123.vaiwan.com/"+ "incident/info/add",
                        type: "post",
                        dataType: "json",
                        data: {jsonData: JSON.stringify(_this.reportInfo)},
                        success: function (data) {
                            if (data.code == 200) {
                                alert("信息提交成功");
                            } else {
                                alert("信息提交失败");
                            }
                        },
                        error: function (error) {
                            _this.errorMsg = error;
                            _this.isError = true;
                        }
                    });
                }

            },
            verifyForm(formObj) {
                var result = true;
                if (formObj.reportPerson == null || formObj.reportPerson == "") {
                    alert("请填写您的姓名")
                    result = false;
                } else if (formObj.reportPersonEmail == null || formObj.reportPersonEmail == "") {
                    alert("请填写您的邮箱信息")
                    result = false;
                } else if (formObj.reportGoodsType == null || formObj.reportGoodsType == "") {
                    alert("请选择物品类型")
                    result = false;
                } else if (formObj.remark == null || formObj.remark == "") {
                    alert("请在备注中填写具体物品以及损坏地方")
                    result = false;
                }
                return result;
            },
            fetchGoodsType() {
                setTimeout(function () {
                    $.ajax({
                        url: "http://xyh123.vaiwan.com/" + 'maintenance/type/list',
                        type: 'POST',
                        dataType: 'text',

                        async: true,
                        success: function (res) {
                            var data = JSON.parse(res)
                            if (data.code == 200) {
                                _this.typeSelect = data.data.list;
                            }
                        }, error: function (res) {
                            alert(JSON.stringify(res))
                        }
                    })
                },1000)

            },
            getUrl() {
                var href =decodeURIComponent(window.location.href);
                var factory = href.substring(href.indexOf("factoryName") + 14, href.indexOf("floorName") - 3);
                var floorName = href.substring(href.indexOf("floorName") + 12, href.indexOf("areaName") - 3);
                var area = href.substring(href.indexOf("areaName") +11, href.indexOf("locationNum") - 3);
                var locationNum = href.substring(href.indexOf("locationNum") + 14,href.indexOf("}")-1 )
                _this.reportInfo.reportLocation = factory + "," + floorName + "," + area + "," + locationNum
                console.log("物品保修位置:" + _this.reportInfo.reportLocation)
            }

        },
        created() {

        },
        mounted() {
            _this.getUrl();
            _this.fetchGoodsType();
        },

    }
</script>

<style scoped>
    input[type="checkbox"] {
        -webkit-appearance: radio;
    }

    input:checked:before {
        color: #fff;
    }

    button {
        width: 90%;
        border-radius: 8rem 8rem 8rem 8rem;
        height: 2.8rem;
        background-image: linear-gradient(135deg, #676F8C 0%, #0C101D 100%);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        outline: none;
        color: #fff;
    }

    .icon-face-img-show {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;

        display: -moz-box;
        -moz-box-orient: horizontal;
        -moz-box-pack: center;
        -moz-box-align: center;

        text-align: center;
        padding: 5px;
        margin: 10% auto;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        box-shadow: 0 0 0.8rem #a5acc5;
    }

    .icon-face-img-show img {
        width: 3rem;
        height: 3rem;
    }

    .input-type {
        width: 90%;
        border-radius: 10rem 10rem 10rem 10rem;
        border: 1px solid #E6E6E6;
        height: 2.5rem;
        position: relative;
        padding: 0 0 0 0;
        text-align: left;
    }

    .input-type label {
        vertical-align: middle;
        font-size: 1rem;
        font-weight: 600;
        color: #999;
        line-height: 2.4;
        margin: 0rem 0 0 1rem;
    }

    .input-type .select {
        border-radius: 0.5rem;
        display: none;
        z-index: 99;
        width: 100%;
        box-shadow: 0 0 0.8rem #aaa;
        position: absolute;
        top: 2.4rem;
        background-color: #fff;
    }

    .input-type .select ul {
        padding: 0;
        margin: 0.2rem 0;
    }

    .input-type .select li {
        list-style: none;
        height: 1.8rem;
        text-indent: 2rem;
        margin: 0;
        padding: 0;
    }

    .select li:hover {
        background-color: #eee;
    }

    .input-type input {
        left: 7rem;
        position: absolute;
        border-style: none;
        font-size: 1rem;
        width: 50%;
        height: 2rem;
        outline: none;
    }

    center {
        margin-top: 7%;
    }

    .input-type input:-moz-placeholder {
        color: #CCC;
    }

    .input-type ::-webkit-input-placeholder {
        color: #CCC;
    }

    .input-type ::-moz-placeholder {
        color: #CCC;
    }

    /* firefox 19+ */
    .input-type :-ms-input-placeholder {
        color: #aaa;
    }

    /* ie */
</style>