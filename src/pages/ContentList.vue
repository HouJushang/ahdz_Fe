<style lang="sass">
  .contentlist_page
    .contentlist_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="contentlist_page">
    <div class="contentlist_page_top">
      <p>{{category.name}}文章列表</p>
    </div>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          <span>{{dateFormat(new Date(scope.row.createdAt))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="最后修改时间">
        <template slot-scope="scope">
          <span>{{dateFormat(new Date(scope.row.updatedAt))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit"  size="mini" @click="edit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete"  size="mini" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {getCategoryById} from '../api/category'
  import {queryContent} from "../api/content";
  import dateFormat from '../util/dateFormat'

  export default {
    name: 'admmin_page',
    data () {
      return {
        dateFormat,
        category: {},
        listData: {
          count: 0,
          rows: []
        },
      }
    },
    methods : {
      getCategory() {
        getCategoryById(this.$route.params.categoryId).then(e => {
          this.category = e
        })
      },
      getRows() {
        queryContent(this.$route.params.categoryId).then(e => {
          this.listData = e;
        })
      },
      edit(row) {
        this.$router.push({
          name: this.category.model + 'Edit',
          params: {
            categoryId: this.category.id,
            id: row.id
          }
        })
      },
      del(row) {
      },
    },
    created() {
      this.getRows();
      this.getCategory();
    }
  }
</script>
