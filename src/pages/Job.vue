<style lang="sass">
  .job_page
    .job_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="job_page">
    <div class="job_page_top">
      <p>招聘管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="goAdd">添加招聘信息</el-button>
    </div>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="company.companyName" label="公司名称"></el-table-column>
      <el-table-column prop="name" label="职位名称"></el-table-column>
      <el-table-column prop="xingzhi" label="工作性质"></el-table-column>
      <el-table-column prop="xingzhi" label="性质"></el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          {{['待审核', '审核通过', '未通过'][scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tag :type="['danger', 'sucess'][scope.row.isShow]">{{ ['不展示', '展示'][scope.row.isShow] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit"  size="mini" @click="edit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete"  size="mini" @click="del(scope.row)"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-setting"  @click="check(scope.row)"></el-button>
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
  import {queryJob, delJob, checkJob} from '../api/job'
  import dateFormat from '../util/dateFormat'
  export default {
    name: 'admmin_page',
    data () {
      return {
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
        checkDialog: {
          show: false,
          title: '',
          status: 1
        },
      }
    },
    methods : {
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
        this.$router.push({name: 'addJob'})
      },
      edit(row) {
        console.log(row)
        this.$router.push({name: 'editJob', params: {id: row.id}})
      },
      showDel(data) {
        this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delJob(data.id).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryJob({
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          }
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
      checkSubmit() {
        checkJob({
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
      this.getRows();
    }
  }
</script>
