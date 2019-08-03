<template id="h-select">
    <div id="input-type" v-on:click="showSelect($event)">
        <label>{{label}}</label>
        <input placeholder="请选择您所属的院系" readonly="readonly" v-model="label">
        <div class="select">
            <ul>
                <li v-for="info in select" v-on:click="choseSelect(info)">
                    {{info.label}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    Vue.company('h-select', {template: "#h-select"})
    export default {
        template: "#input-type",
        props: ['select', 'label', 'value'],
        name: "h-select",
        data() {
            return {
                label: this.label,
                select: this.select,
                value: this.value
            }
        },
        methods: {
            choseSelect(info) {
                _this.value = info.label;
                ;
                $(".select").slideUp(200);
                // console.log(this.newtodo);
            },
            showSelect(document) {
                var element = $(document.target).siblings(".select");
                element.slideDown(200);
            }
        }
    }

</script>

<style scoped>
    #input-type {
        width: 90%;
        border-radius: 10rem 10rem 10rem 10rem;
        border: 1px solid #aaa;
        height: 3.5rem;
        position: relative;
        padding: 0 0 0 0;
        text-align: left;
    }

    #input-type label {
        vertical-align: middle;
        font-size: 1.3rem;
        font-weight: 600;
        color: #777;
        line-height: 3.2rem;
        margin: 0 0 0 1.5rem;
    }

    #input-type .select {
        border-radius: 0.5rem;
        display: none;
        z-index: 99;
        width: 100%;
        box-shadow: 0 0 0.8rem #aaa;
        position: absolute;
        top: 4rem;
        background-color: #fff;
    }
</style>