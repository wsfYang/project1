 <template>
    <div id="app">
        <router-view v-wechat-title='$route.meta.title'></router-view>
        <lg-preview></lg-preview>

    </div>
</template>

<script>
    import vuePicturePreview from 'vue-picture-preview'
    import Vue from 'vue'

    Vue.use(vuePicturePreview)
    export default {
        debug: true,
        name: 'app',
        data() {
            return {}
        },

        methods: {}
    }
</script>
<style>
    body {
        font-family: PingFang_SC_Semibold;
        /*font-size: 14px;*/
        -webkit-font-smoothing: antialiased;
        margin: 0px;
    }

    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }

    .el-submenu [class^=fa] {
        vertical-align: baseline;
        margin-right: 10px;
    }

    .el-menu-item [class^=fa] {
        vertical-align: baseline;
        margin-right: 10px;
    }

    .toolbar {
        background: #fff;
        padding: 10px;
    }

    .el-form-item {
        margin-bottom: 10px;
    }

</style>
