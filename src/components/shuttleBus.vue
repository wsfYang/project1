<template>
    <div style="height: 100%;overflow:auto;width: 100% ;margin-top: 0px" id="div1">
        <mt-header title="班车信息">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>

            <mt-button  @click.native="jump" slot="right">添加</mt-button>
        </mt-header>

        <el-date-picker
                @input="fetchAppointmentsInfo()"
                v-model="query.appointmentsTime"
                type="datetime"
                placeholder="选择日期">
        </el-date-picker>

        <div >
        <ul style="margin-top: 10px; ">
            <li v-for="i in accessList"  >
                <el-card class="box-card" style="border-radius: 20px;width:90% ;height: 3%" >
                    <div>
                        <el-row>
                            <el-col :span="5" :offset="1">
                                <span>{{i.busNum}}号车</span>
                            </el-col>
                            <el-col :span="3" :offset="1">
                                <span>{{i.licenceNum}}</span>
                            </el-col>
                            <el-col :span="5" :offset="8">
                                <span :style="{color:'red'}">固 {{i.fixNum}}</span>
                            </el-col>
                            <el-col :span="5" :offset="8">
                                <span :style="{color:'green'}" >剩{{surplusList[i.busNum]}} </span>
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
        name: "shuttleBus",
        data() {
            _this = this
            return {
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                totalRecords: 0,
                startRow: 0,
                tableData: [],
                surplusList: [],
                accessList: [],
                getBusNum:[],
                getSeatNum:[],
                query: {
                    appointmentsTime: new Date()
                },

            }
        },
        methods: {
            jump(){
                _this.$router.push("/ShuttleAppointment");
            },

            fetchAppointmentsInfo() {

                    $.ajax({
                        url: "http://qqq000.vaiwan.com/" + "shuttle/bus/passenger/surplus",
                        type: 'POST',
                        dataType: 'json',
                        data: {showTime:_this.query.appointmentsTime.format("yyyy-MM-dd hh:mm:ss")},
                        success: function (data) {
                            if (data.code == 200) {
                            _this.surplusList = data.data;
                            }
                        }, error: function (res) {
                            alert(JSON.stringify(res))
                        }
                    })
            },
            getSeat() {


                $.ajax({
                    url: "http://qqq000.vaiwan.com/" + "shuttle/bus/selectlistApp",
                    type: 'POST',
                    dataType: 'json',
                    data: {shuttleBus:JSON.stringify(_this.query)},
                    success: function (data) {
                        if (data.code == 200) {
                            _this.accessList = data.data.list;
                            console.log('fs'+_this.accessList)
                        }
                    }, error: function (res) {
                        alert(JSON.stringify(res))
                    }
                })
            },
            handleScroll() {
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.getElementById("div1").scrollTop
                //变量windowHeight是可视区的高度
                var windowHeight = document.getElementById("div1").clientHeight
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.getElementById("div1").scrollHeight
                //滚动条到底部的条件
                if (scrollTop + windowHeight == scrollHeight) {
                    $(".mes").html("已无更多数据")
                    return
                }
            },
        },
        mounted: function () {
            _this.getSeat();
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