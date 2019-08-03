<template>
    <div class="well well-lg" style="background-color: white;height: 100%">
        <mt-header>
            <router-link @click.native="jump" to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>

        </mt-header>


        <div>
            <center><span
                    style="width:100px;height:33px;font-size:20px;
                  font-weight:600;color:rgb(70,76,82);
                    line-height:20px;display: inline-block;margin-top: 10px">预约</span>
            </center>
            <form>
                <mt-field label="员工工号:" placeholder="请输入工号" v-model="add.staffId"
                          style="font-weight: bold"></mt-field>

                <mt-field label="员工姓名:" type="name" placeholder="姓名" v-model="add.staffName"
                          style="font-weight: bold"></mt-field>

                <!--<mt-field label="班车编号:" type="number" placeholder="班车编号" v-model="add.busNum"
                          style="font-weight: bold">

                </mt-field>-->
                <el-select v-model="add.busNum" filterable placeholder="班车编号">
                    <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>

                </el-select>

                <mt-datetime-picker
                        ref="picker"
                        type="date"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        :startDate="new Date()"
                        @confirm="handleChange"
                        v-model="now">
                </mt-datetime-picker>
                <mt-datetime-picker
                        ref="time"
                        type="time"
                        @confirm="handleChangeTime">
                </mt-datetime-picker>
                <el-row>
                    <el-col :span="16">
                        <mt-field label="预约时间:" readonly placeholder="年月日" v-model="showDate"
                                  style="font-weight: bold" @focus.native.capture="openPicker"></mt-field>
                    </el-col>
                    <el-col :span="16">
                        <mt-field label="      " v-model="showstart" placeholder="时分秒"
                                  style="font-weight: bold "
                                  @focus.native.capture="openPickerTime(0)" readonly></mt-field>
                    </el-col>
                </el-row>
            </form>
            <center>
                <mt-button
                        style="!important;height:48px;background:linear-gradient(101deg,rgb(202,242,240) 0%,rgb(137,230,241) 100%);
                        border-radius:24px;width: 50%;margin-top: 15px"
                        @click.native="onAppointment(add)">添加预约
                </mt-button>


            </center>

        </div>
    </div>
</template>

<script>
    let _this;
    import {Picker} from 'mint-ui';
    import {DatetimePicker} from 'mint-ui'
    import {MessageBox} from 'mint-ui';

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    export default {
        name: "shuttleAppointment",

        data() {
            _this = this;
            return {
                showDate: '',
                showstart: '',
                now: new Date(),
                add: {
                    staffId: '',
                    staffName: '',
                    ridingTime: '',
                    busNum: '',
                    appointmentsTime: ''
                },
                pickerVisible: "",
                choseVisitPurpose: false,
                options: [],
            }
        },
        methods: {
            jump() {
                _this.$router.push("/ShuttleBus");
            },
            handleChange(value) {
                _this.showDate = value.Format("yyyy-MM-dd");
            },
            handleChangeTime(value) {
                if (_this.showTimeChose == 0) {
                    _this.showstart = value;
                }

            },
            openPickerTime(val) {
                _this.showTimeChose = val;
                if (_this.showTimeChose == 0) {
                    this.$refs.time.open();
                }
            },
            openPicker() {
                console.log("打开时间控件")
                this.$refs.picker.open();
            },
            //判断添加 字段是否为空
            verifyForm(formObj) {
                let result = true;
                if (_this.showstart == '' || _this.showDate == '') {
                    showMessage(_this, "预约时间不能为空！");
                    result = false;
                } else if (formObj.busNum == null || formObj.busNum == "") {
                    showMessage(_this, "班车编号不能为空！");
                    result = false;
                }
                else if (formObj.staffId == null || formObj.staffId == "") {
                    showMessage(_this, "员工id不能为空！");
                    result = false;
                } else if (formObj.staffName == null || formObj.staffName == "") {
                    showMessage(_this, "姓名不能为空！");
                    result = false;
                }
                return result;
            },
            onAppointment(item) {
                if (_this.verifyForm(item)) {
                    _this.add.appointmentsTime = new Date(_this.showDate.replace(/-/g, "/") + " " + _this.showstart);
                    $.ajax({
                        url: "http://yyyy222.vaiwan.com/" + "shuttle/bus/appointments/addApp",
                        type: "post",
                        dataType: "json",
                        data: {shuttleBusAppointments: JSON.stringify(_this.add)},
                        success: function (data) {
                            if (data.code == 200) {
                                _this.add = {}
                                _this.showstart = ''
                                _this.showDate = ''
                                MessageBox({
                                    title: '标题',
                                    message: '添加成功',
                                    confirmButtonText: '确定'
                                })
                            } else {
                                showMessage("添加失败");
                            }
                        },
                        error: function (error) {
                            _this.errorMsg = error;
                            _this.isError = true;
                        }
                    });
                }
            },
            //查询所有班车编号
            getBusNum() {
                $.ajax({
                    url: "http://yyyy222.vaiwan.com/" + "shuttle/bus/getBusNum",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 200) {
                            let num = data.data
                            for (let i = 0; i < num.length; i++) {
                                _this.options.push(num[i].busNum)
                            }
                            console.log("fd" + _this.options)
                        } else {
                            showMessage("显示班车编号失败");
                        }
                    },
                    error: function (error) {
                        _this.errorMsg = error;
                        _this.isError = true;
                    }
                });
            },
        },
        mounted: function () {
            _this.getBusNum();
        },
    }
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

    }

    .picker-items {
        height: 100%
    }
</style>