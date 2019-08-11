<template>
    <div class="el-container">
        <el-container direction="vertical">
            <el-header>Header</el-header>
            <el-container>
                <transition name="fade" mode="out-in">
                    <el-aside width="100px" v-if="show">Aside</el-aside>
                </transition>
                <el-main>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!--                        <el-tab-pane label="库一" name="first" class="el-container">-->
                        <!--                            <div class="el-container">-->
                        <!--                                <table-operation></table-operation>-->
                        <!--                            </div>-->
                        <!--                        </el-tab-pane>-->
                        <el-tab-pane class="el-container" v-for="db of dbList" :label="db" :name="db" :key="db">
                            <div class="el-container">
                                <table-operation></table-operation>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <!--                <button v-on:click="show = !show">-->
                    <!--                    Toggle-->
                    <!--                </button>-->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  import tableOperation from './Operation/TableOperation'

  export default {
    name: 'Operation',
    components: {tableOperation},
    data () {
      return {
        show: true,
        activeName: '1',
        ruleForm: {},
        dbList: ['1', '2', '3', '4', '5']
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      submitForm (formName) {

      }
    }
  }
</script>

<style lang="scss">
    html, body, #app, .el-tabs, .el-tabs--top, .el-container {
        padding: 0px;
        margin: 0px;
        height: 100%;
    }

    .el-tabs__content {
        height: 92%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }

</style>
