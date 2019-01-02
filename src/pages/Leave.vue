<template>
  <section class="news_page">
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="联系人"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="content" label="留言内容"></el-table-column>
      <el-table-column prop="name" label="添加时间">
        <template slot-scope="scope">
          <span>{{dateFormat(new Date(scope.row.createdAt))}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin: 20px 0 10px 0;"
                   background page-sizes :page-sizes="[10, 20, 50, 100]" :page-size="this.pageInfo.pageSize"
                   layout="total, sizes, prev, pager, next"
                   @size-change="sizeChange" @current-change="currentChange"
                   :total="listData.count">
    </el-pagination>
  </section>
</template>
<script>
  import {queryLeave} from "../api/content"
  import dateFormat from '../util/dateFormat'
  export default {
    name: 'leave_page',
    data() {
      return {
        dateFormat,
        listData: {
          count: 0,
          rows: []
        },
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
      }
    },
    components: {
      tinymce
    },
    methods: {
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
        queryLeave({
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          }
        }).then(e => {
          this.listData = e
        })
      },
    },
    created() {
      this.getRows();
    }
  }
</script>
