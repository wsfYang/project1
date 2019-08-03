export default {
    getClass: function () {
        var tagName = [{label: "2019级3班", value: "一年级3班"}, {label: "二年级3班", value: "二年级3班"}, {
            label: "三年级3班",
            value: "三年级3班"
        }];
        return tagName;
    },
    getDormitory: function () {
        var tagName = [{label: "品园6楼", value: "1号"}, {label: "2号宿舍楼", value: "2号"}, {label: "3号宿舍楼", value: "3号"}];
        return tagName;
    },
    getDepartments: function () {
        var tagName = [{label: "新闻系2019级", value: "新闻系2019级"}, {label: "院系2", value: "院系2"}, {label: "院系3", value: "院系3"}];
        return tagName;
    },
    getDormitoryNumber: function () {
        var tagName = [{label: "501", value: "501"}, {label: "702", value: "702"}, {label: "703", value: "703"}];
        return tagName;
    },
}