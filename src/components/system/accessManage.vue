<template>
    <div>
        <el-col class="well well-lg" style="background-color: white; margin-top: 20px">
            <el-row>
                <el-col>
                    <el-form :model="filters" label-position="right" label-width="60px">
                        <el-col :span="5">
                            <el-form-item label="日期">
                                <el-date-picker
                                        v-model="filters.startTime"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form>


                    <el-col :span="5">
                        <el-button
                                icon="el-icon-search"
                                size="normal"
                                type="primary"
                                @click="search">搜索
                        </el-button>
                    </el-col>


                    <el-table
                            v-loading="loadingUI"
                            element-loading-text="获取数据中..."
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                width="75"
                                align="center"
                                prop="name"
                                label="邀请人">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="invitation.visitorParkFace"
                                width="300"
                                label="头像">
                            <template slot-scope="scope">
                                <img :src="scope.row.invitation.visitorParkFace" height="70" width="70"
                                     style="border-radius: 50%"/>
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="invitation.visitorName"
                                width="200"
                                label="访客名称">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="invitation.visitPurpose"
                                width="200"
                                label="来访目的">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="invitation.visitBeginTime"
                                label="进入时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="invitation.visitEndTime"
                                label="离去时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="invitation.visitorPhone"
                                label="访客手机号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="invitation.visitPlaces"
                                label="访问区域">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作"
                                width="200">
                            <template scope="scope">
                                <el-button
                                        size="small"
                                        icon="el-icon-edit"
                                        type="primary"
                                        @click="handleEdit(scope.row.invitation)">通过
                                </el-button>
                                <el-button
                                        size="small"
                                        icon="el-icon-edit"
                                        type="primary"
                                        @click="printBtn()">打印
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="text-align: center; margin-top: 20px">
                        <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="totalRecords">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <div class="Onprint">
            <p v-for="visition in tableData">
                <span>姓名:{{visition.invitation.visitorName}}</span>&emsp;&emsp;
                <span>接待人:{{visition.name}}</span><br>
                <span>来访目的:{{visition.invitation.visitPurpose}}</span><br>
                <span>开始时间:{{visition.invitation.visitBeginTime}}</span><br>
                <span>结束时间:{{visition.invitation.visitEndTime}}</span><br>
                <span>访问区域:{{visition.invitation.visitPlaces}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    let _this;
    import {MessageBox} from 'mint-ui';

    export default {
        name: "accessManage",
        data() {
            _this = this;
            return {
                isError: false,
                errorMsg: '',
                totalRecords: 0,
                selectedItem: {},
                deleteConfirmVisible: false,
                tableData: [],
                //分页
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 1,
                filters: {
                    startTime: new Date()
                },
                loadingUI: false,
            }
        },
        methods: {
            search() {
                _this.loadingUI = true;
                _this.filters.page = _this.currentPage;
                _this.filters.size = _this.pageSize;
                if (_this.filters.startTime == "" || _this.filters.startTime == null) {
                    _this.loadingUI = false;
                    this.$alert('请选择日期', '提示', {
                        confirmButtonText: '确定'
                    })
                    return;
                }
                _this.loadingUI = true;
                $.ajax({
                    url: HOST + "invitation/queryByTime",
                    type: "POST",
                    dataType: "json",

                    data: _this.filters,
                    success: function (data) {
                        if (data.data.list == "") {
                            _this.$alert('当前日期查询内容为空，请选择其它时间', '提示', {
                                confirmButtonText: '确定',
                            })
                            _this.loadingUI = false;
                            return;
                        } else {
                            _this.totalRecords = data.data.total;
                            _this.tableData = data.data.list;
                        }
                        _this.loadingUI = false;

                    },
                    error: function (data) {
                        showMessage(_this, "服务器访问出错", 1)
                        _this.loadingUI = false;
                    }
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.search();
            },
            handleEdit(invitations) {
                $.ajax({
                    url: HOST + "visitors/add",
                    type: "POST",
                    dataType: "json",
                    data: {
                        jsonData: JSON.stringify(invitations)
                    },
                    sucess: function (data) {
                        if (data.data) {
                            this.$alert('已添加至园区，可通行', '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    },
                    error: function (data) {
                        showMessage(_this, "服务器内部错误，请联系管理员", 0);
                    }
                })
            },
            printBtn() {
                this.remove_ie_header_and_footer();
                let newstr = document.getElementsByClassName('Onprint')[0].innerHTML;
                alert(newstr)
                console.log(newstr)
                window.document.body.innerHTML = newstr;
                let oldstr = window.document.body.innerHTML;
                window.print();
                window.location.reload();  //解决打印之后按钮失效的问题
                window.document.body.innerHTML = oldstr;
                return false;
            },
            remove_ie_header_and_footer() {
                var hkey_path;
                hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
                try {
                    var RegWsh = new ActiveXObject("WScript.Shell");
                    RegWsh.RegWrite(hkey_path + "header", "");
                    RegWsh.RegWrite(hkey_path + "footer", "");
                } catch (e) {
                }
            },
        }


    }
</script>

<style scoped>

    .Onprint {
        display: none;
    }
</style>