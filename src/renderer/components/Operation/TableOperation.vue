<template>
    <el-container>
        <el-aside width="200px" style="border:1px red solid">
            <!--            <el-table-->
            <!--                    :data="tableNameData"-->
            <!--                    style="width: 100%;">-->
            <!--                <el-table-column style="background-color: #003"-->
            <!--                                 fixed-->
            <!--                                 prop="date"-->
            <!--                                 label="数据表名"-->
            <!--                                 width="200">-->
            <!--                </el-table-column>-->
            <!--            </el-table>-->
            <div>
                表名
            </div>
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>

            <el-tree
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree">
            </el-tree>
        </el-aside>
        <el-main style="border:1px #000 solid">
            <div style="margin: 0 10px 10px 0;float: right;">
                <el-button type="warning" icon="el-icon-upload">新增</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
                <el-button type="danger" icon="el-icon-edit">修改</el-button>
                <el-button type="primary" icon="el-icon-search">查找</el-button>
            </div>
            <div>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 6}"
                        placeholder="请输入SQL内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item v-for="item of tableInfo" :label="item.name">
                                    <!--                                    <span>{{ item.field.replace(/'/g,'') }}</span>-->
                                    <span>{{ props.row[item.field]  }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-for="i in iii" :label="i.name" :prop="i.field">
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    name: 'TableOperation',
    data () {
      return {
        filterText: '',
        tableNameData: [{
          date: '2016-05-02'
        }, {
          date: '2017-07-12'
        }],
        tableInfo: [{
          name: '商品名称',
          field: 'name'
        }, {
          name: '所属店铺',
          field: 'shop'
        }, {
          name: '商品 ID',
          field: 'id'
        }, {
          name: '店铺 ID',
          field: 'shopId'
        }, {
          name: '商品分类',
          field: 'category'
        }, {
          name: '店铺地址',
          field: 'address'
        }, {
          name: '商品描述',
          field: 'desc'
        }],
        iii: [{
          name: '商品名称',
          field: 'name'
        }, {
          name: '商品 ID',
          field: 'id'
        }, {
          name: '商品描述',
          field: 'desc'
        }],
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        textarea: '',
        data: [{
          id: 1,
          label: '一级 1'
        }, {
          id: 2,
          label: '一级 2'
        }, {
          id: 3,
          label: '一级 3'
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    }
  }
</script>

<style lang="scss">
    @import url("//unpkg.com/element-ui@2.11.0/lib/theme-chalk/index.css");

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%; /* 50% */
    }
</style>
