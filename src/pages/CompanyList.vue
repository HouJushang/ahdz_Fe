<style lang="sass">
  .admmin_page
    .admmin_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="admmin_page">
    <div class="admmin_page_top">
      <p>公司列表</p>
    </div>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="公司ID"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="user.phone" label="手机号"></el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {queryCompanyList} from '../api/company'
  export default {
    name: 'user_page',
    data () {
      return {
        listData: {
          count: 0,
          rows: []
        },
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        filter: {
        }
      }
    },
    methods :{
      sizeChange(e) {
        this.pageInfo.pageSize = e
        this.pageInfo.currentPage = 1
        this.getRows();
      },
      currentChange(e){
        this.pageInfo.currentPage = e
        this.getRows();
      },
      getRows() {
        queryCompanyList({
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          }
        }).then(e => {
          this.listData = e;
        })
      },
    },
    created() {
      this.getRows();
    }
  }
</script>
