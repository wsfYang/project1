Vue.company('h-select',
    {
        name: "h-select",
        template: '<div id="input-type" v-on:click="showSelect($event)">\n' +
            '        <label>{{label}}</label>\n' +
            '        <input placeholder="请选择您所属的院系" readonly="readonly"  v-model="label" @click="ulShow = !ulShow">\n' +
            '        <div class="select">\n' +
            '            <h-option v-bind:selectList="" v-on:receive="changeVal"></h-option>\n' +
            '        </div>\n' +
            '    </div>',
        data: function () {
            return {
                label: "",
                ulShow: false,
                selectVal: ""
            }
        },
        props: ['label', 'selectList', 'value'],
        methods: {
            changeVal(value) {
                this.selectVal = value
            }
        }


    })