Vue.company('h-select', {
    props: ['selectList'],
    template: '<ul>' +
        '<li v-for="info in selectList" v-on:click="selectLi(info)">{{info.label}}</li>' +
        '</ul>',
    methods: {
        selectLi: function (item) {
            //$emit触发当前实例上的自定义事件 receive
            this.$emit('receive', item);
        }
    }
})