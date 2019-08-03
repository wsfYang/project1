<template>
    <div style="height: 100%;overflow:auto;width: 100% ;margin-top: 0px" id="div1">
    <mt-header title="我的信息">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>

        <mt-button slot="right">添加</mt-button>
    </mt-header>
    <div style="height: 700px;overflow:auto" id="div1">
        <ul style="margin-top: 10px;margin-left: -10px ">
            <li v-for="i in accessList">


                    <div>
                        <el-row>
                            <label style="float: left">员工工号:</label>
                            <el-col :span="2" :offset="2">
                                <span>{{i.staffId}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <label style="float: left">员工工号:</label>
                            <el-col :span="2" :offset="2">
                                <span>{{i.ridingTime}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <label style="float: left">员工工号:</label>
                            <el-col :span="5" :offset="3">
                                <span>{{i.staffName}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <label style="float: left">员工工号:</label>
                            <el-col :span="18" :offset="10" style="margin-top: -40px">
                            <span style="margin-left: 180px"
                                  :style="">{{i.busNum}}</span>
                            </el-col>
                        </el-row>
                    </div>
            </li>
        </ul>
        <span class="mess"></span>
    </div>
    </div>
</template>

<script>
    var _this;
    export default {
        name: "staffInfo",
        data() {
            _this = this
            return {
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                totalRecords: 0,
                startRow: 0,
                tableData: [],
                staffId:'001',
                accessList: [],
                query: {
                    staffId: '',
                    staffName: '',
                    ridingTime: '',
                    busNum: '',
                    appointmentsTime: ''
                },

            }
        },
        methods: {
            fetchAppointmentsInfo() {
                setTimeout(function () {
                    $.ajax({
                        url: "http://yyyy222.vaiwan.com/" + "shuttle/bus/staff/findbyId",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            staffId: _this.staffId,
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
            },

        },
        mounted: function () {
            _this.fetchAppointmentsInfo();

        }
    }
</script>

<style>
    li {
        list-style: none;
        margin-top: 18px;
    }
</style>