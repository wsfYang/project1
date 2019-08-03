<template>
    <div style="height: 100%;overflow:auto;width: 100% ;margin-top: 0px" id="div1">
        <mt-header title="预约历史">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>

            <mt-button @click.native="jump" slot="right">添加</mt-button>
        </mt-header>
        <div style="width: 80%;overflow:auto" id="div1">
            <ul style="margin-top: 10px;margin-left: -10px ">
                <li v-for="i in accessList">
                    <el-card class="box-card" style="border-radius: 20px;width:430px ">

                        <div>
                            <el-row>
                                <el-col :span="2" :offset="2">
                                    <span>{{i.staffId}}</span>
                                </el-col>
                                <el-col :span="2" :offset="2">
                                    <span>{{i.ridingTime}}</span>
                                </el-col>
                                <el-col :span="5" :offset="3">
                                    <span>{{i.staffName}}</span>
                                </el-col>
                                <el-col :span="18" :offset="10" style="margin-top: -40px">
                            <span style="margin-left: 180px"
                                  :style="">{{i.busNum}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </li>
            </ul>
            <span class="mess"></span>
        </div>
    </div>
</template>

<script>
    var _this;
    export default {
        name: "ShuttleAppointmeInfo",
        data() {
            _this = this
            return {
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                accesscount:0,
                totalRecords: 0,
                startRow: 0,
                tableData: [],

                accessList: [],
                    staffId:'111',

                    endTime: '',
                    startTime: '',

                today: new Date(),
                yesterday: new Date(),
                yestermon: new Date()
            }
        },
        methods: {

            fetchAppointmentsInfo() {
                var scrollTop = document.getElementById("div1").scrollTop
                //变量windowHeight是可视区的高度
                var windowHeight2 = document.getElementById("div1").clientHeight
                //变量scrollHeight是滚动条的总高度
                var scrollHeight2 = document.getElementById("div1").scrollHeight
                //滚动条到底部的条件
                if (scrollTop + windowHeight2 == scrollHeight2) {

                    //判断查询出来的数据长度是否等于总数量，如果不等于，则继续查，如果等于，则return出去，不再继续查
                    if (_this.accesscount == _this.totalRecords) {
                        $(".mess").html("无更多数据")
                        return
                    }


                    _this.yesterday.setTime(_this.today.getTime() - 1000 * 60 * 60 * 24);
                    _this.yestermon.setTime(_this.today.getTime() - 1000 * 60 * 60 * 24 * 31);
                    let queryFinishTime = _this.yesterday.getFullYear() + '-' + ((_this.yesterday.getMonth() + 1) < 10 ? '0' + (_this.yesterday.getMonth() + 1) : (_this.yesterday.getMonth() + 1)) + '-' + (_this.yesterday.getDate() < 10 ? '0' + _this.yesterday.getDate() : _this.yesterday.getDate());
                    let queryStartTime = _this.yestermon.getFullYear() + '-' + ((_this.yestermon.getMonth() + 1) < 10 ? '0' + (_this.yestermon.getMonth() + 1) : (_this.yestermon.getMonth() + 1)) + '-' + (_this.yestermon.getDate() < 10 ? '0' + _this.yestermon.getDate() : _this.yestermon.getDate());
                    _this.startTime = queryStartTime + " 23:59:59";
                    _this.endTime = queryFinishTime + " 00:00:00"

                    console.log("起始时间" + _this.startTime + "结束时间" + _this.endTime)
                    setTimeout(function () {
                        $.ajax({
                            url: "http://yyyy222.vaiwan.com/" + "shuttle/bus/appointments/selectlistApp",
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                staffId: _this.staffId,
                                startTime: _this.startTime,
                                endTime: _this.endTime
                            },
                            success: function (data) {
                                if (data.code == 200) {
                                    _this.accessList = data.data;
                                    console.log('fdfs' + _this.accessList.staffName)
                                }
                            }, error: function (res) {
                                alert(JSON.stringify(res))
                            }
                        })
                    }, 1000)
                }
            }
            ,

        },
        mounted: function () {
            _this.fetchAppointmentsInfo();
            document.getElementById("div1").addEventListener("scroll", _this.handleScroll);

        }
    }
</script>

<style>
    li {
        list-style: none;
        margin-top: 18px;
    }
</style>