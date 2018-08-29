<style lang="sass">
  .product_page
    .product_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="product_page">
    <div class="product_page_top">
      <p>商品管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="goAdd">添加商品</el-button>
    </div>
    <el-form :inline="true"  size="mini" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="filter.title"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filter.status" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value="0"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="未通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-select v-model="filter.isShow" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="不展示" value="0"></el-option>
          <el-option label="展示" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="company.companyName" label="公司名称"></el-table-column>
      <el-table-column prop="guige" label="规格"></el-table-column>
      <el-table-column prop="jiage" label="价格"></el-table-column>
      <el-table-column label="是否展示">
        <template slot-scope="scope">
          <el-tag :type="['danger', 'sucess'][scope.row.isShow]">{{ ['不展示', '展示'][scope.row.isShow] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"  width="80">
        <template slot-scope="scope">
          <el-tag :type="['info', 'success', 'danger'][scope.row.status]">{{['待审核', '通过', '未通过'][scope.row.status]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="排序(大到小)">
        <template slot-scope="scope">
          <input :value="scope.row.order" :idValue="scope.row.id" type="number" @change="blurHander"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit"  size="mini" @click="edit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete"  size="mini" @click="showDel(scope.row)"></el-button>
          <el-button v-if="rolename == '审核员'" type="warning" size="mini" icon="el-icon-setting"  @click="check(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="`《${checkDialog.title}》- 审核`" :visible.sync="checkDialog.show" width="30%">
      <div>
        <el-radio v-model="checkDialog.status" :label="1">通过</el-radio>
        <el-radio v-model="checkDialog.status" :label="2">未通过</el-radio>
      </div>
      <div style="padding: 20px 0;">
        <el-button type="primary" size="mini" style="float: right;" @click="checkSubmit">提交</el-button>
      </div>
    </el-dialog>
    <el-pagination style="float: right; margin: 20px 0 10px 0;"
                   background page-sizes :page-sizes="[10, 20, 50, 100]" :page-size="this.pageInfo.pageSize"
                   layout="total, sizes, prev, pager, next"
                   @size-change="sizeChange" @current-change="currentChange"
                   :total="listData.count">
    </el-pagination>
  </section>
</template>

<script>
  import {queryProduct, delProduct, checkProduct, updateProduct} from '../api/product'
  import dateFormat from '../util/dateFormat'
  import { filter } from '../util/objectUtil'

  export default {
    name: 'admmin_page',
    data () {
      return {
        rolename: localStorage.getItem('rolename'),
        dateFormat,
        formData: {},
        listData: {
          count: 0,
          rows: []
        },
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        filter:{
          status: "",
          isShow: "",
          title: ""
        },
        filterCopy: {},
        filterCopyEmpty: {},
        checkDialog: {
          show: false,
          title: '',
          status: 1
        },
      }
    },
    methods : {
      blurHander(e){
        const order = parseInt(e.target.value);
        if(!(order >= 0)){
          return false;
        }
        updateProduct({
          id: parseInt(e.target.getAttribute('idValue')),
          order: order
        }).then(e => {
          this.$message({
            message: '排序更新成功',
            type: 'success'
          });
        }).catch(e => {
          this.getRows()
        })
      },
      sizeChange(e) {
        this.pageInfo.pageSize = e
        this.pageInfo.currentPage = 1
        this.getRows();
      },
      currentChange(e){
        this.pageInfo.currentPage = e
        this.getRows();
      },
      goAdd() {
        this.$router.push({name: 'addProduct'})
      },
      edit(row) {
        console.log(row)
        this.$router.push({name: 'editProduct', params: {id: row.id}})
      },
      showDel(data) {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delProduct(data.id).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryProduct({
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          },
          filter: filter(this.filter)
        }).then(e => {
          this.listData = e;
        })
      },
      check(row) {
        Object.assign(this.checkDialog, {
          show: true,
          title: row.title,
          id: row.id,
          status: row.status != 0 ? row.status : 1
        })
      },
      onSubmit() {
        this.pageInfo.currentPage = 1
        Object.assign(this.filterCopy, this.filter)
        this.getRows()
      },
      onClear() {
        this.pageInfo.currentPage = 1;
        Object.assign(this.filterCopy, this.filterCopyEmpty)
        Object.assign(this.filter, this.filterCopyEmpty)
        this.getRows()
      },
      checkSubmit() {
        checkProduct({
          id: this.checkDialog.id,
          status: this.checkDialog.status
        }).then(e => {
          this.checkDialog.show = false
          this.getRows()
        }).catch(e => {
          this.$message.error(e);
        })
      },
    },
    created() {
      Object.assign(this.filterCopy, this.filter)
      Object.assign(this.filterCopyEmpty, this.filter)
      this.getRows();
    }
  }
</script>
