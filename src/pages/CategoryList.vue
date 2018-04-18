<style lang="sass">
  .categoryList_page
    .categoryList_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
    .avatar-uploader .el-upload
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
    .avatar-uploader .el-upload:hover
      border-color: #409EFF
    .avatar-uploader-icon
      font-size: 28px
      color: #8c939d
      width: 178px
      height: 178px
      line-height: 178px
      text-align: center
    .avatar
      width: 178px
      height: 178px
      display: block
</style>
<template>
  <section class="categoryList_page">
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="template" label="模板"></el-table-column>
      <el-table-column prop="model" label="模型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="add(scope.row)">发布文章</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  import {queryCategory, delCategory, addCategory, updateCategory} from '../api/category'
  export default {
    name: 'categoryList_page',
    data () {
      return {
        rows: [],
      }
    },
    methods: {
      add(item) {
        this.$router.push({name: item.model, params: { categoryId: item.id }})
      },
      getRows() {
        queryCategory().then(e => {
          this.rows = e;
        })
      },
    },
    created() {
      this.getRows();
    }
  }
</script>
