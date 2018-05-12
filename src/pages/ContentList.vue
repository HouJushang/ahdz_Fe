<style lang="sass">
  .contentlist_page
    overflow: hidden
    .contentlist_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
    .position
      text-align: center
      li
        display: inline-block
        color: #00b7ee
        margin-left: 10px
        cursor: pointer
        border: 1px solid #00b7ee
        border-radius: 2px
        padding: 0px 4px
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
      <el-table-column prop="createdAt" label="创建时间"  width="150">
        <template slot-scope="scope">
          <span>{{dateFormat(new Date(scope.row.createdAt))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="最后修改时间" width="150">
        <template slot-scope="scope">
          <span>{{dateFormat(new Date(scope.row.updatedAt))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"  width="80">
        <template slot-scope="scope">
          <el-tag :type="['info', 'success', 'danger'][scope.row.status]">{{['待审核', '通过', '未通过'][scope.row.status]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit"  size="mini" @click="edit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete"  size="mini" @click="del(scope.row)"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-setting"  @click="check(scope.row)"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-star-off"  @click="position(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin: 20px 0 10px 0;"
      background page-sizes :page-sizes="[10, 20, 50, 100]" :page-size="this.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next"
      @size-change="sizeChange" @current-change="currentChange"
      :total="listData.count">
    </el-pagination>
    <el-dialog :title="`《${checkDialog.title}》- 审核`" :visible.sync="checkDialog.show" width="30%">
      <div>
        <el-radio v-model="checkDialog.status" :label="1">通过</el-radio>
        <el-radio v-model="checkDialog.status" :label="2">未通过</el-radio>
      </div>
      <div style="padding: 20px 0;">
        <el-button type="primary" size="mini" style="float: right;" @click="checkSubmit">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择推荐位" :visible.sync="positionData.show" width="30%">
      <el-checkbox-group v-model="positionData.choose">
       <el-checkbox v-for="item in positionData.data" :label="item.id">{{item.title}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positionData.show = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="positionSubmit" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import {getCategoryById} from '../api/category'
  import {queryContent, delContent, checkContent} from "../api/content";
  import {addPositionContent, queryPositionContent} from '../api/positionContent'
  import dateFormat from '../util/dateFormat'
  import {queryPosition} from '../api/position'

  export default {
    name: 'admmin_page',
    data () {
      return {
        dateFormat,
        category: {},
        positionData: {
          show: false,
          data: [],
          choose: [],
          row: null,
        },
        listData: {
          count: 0,
          rows: []
        },
        checkDialog: {
          show: false,
          title: '',
          status: 1
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
    methods : {
      getCategory() {
        getCategoryById(this.$route.params.categoryId).then(e => {
          this.category = e
          this.getPostion(e.model)
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
      getRows() {
        queryContent(this.$route.params.categoryId, {
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          }
        }).then(e => {
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
      check(row) {
        console.log(row)
        Object.assign(this.checkDialog, {
          show: true,
          title: row.title,
          id: row.id,
          status: row.status != 0 ? row.status : 1
        })
      },
      checkSubmit() {
        checkContent(this.$route.params.categoryId, {
          id: this.checkDialog.id,
          status: this.checkDialog.status
        }).then(e => {
          this.checkDialog.show = false
          this.getRows()
        }).catch(e => {
          this.$message.error(e);
        })
      },
      positionSubmit() {
        addPositionContent({
          id: this.positionData.row.id,
          model: this.category.model,
          choose: this.positionData.choose
        }).then(e =>{
          this.positionData.show = false;
        }).catch(e => {
          this.$message.error(e);
        })
      },
      getPostion(model) {
        queryPosition({
          model: model
        }).then(e => {
          this.positionData.data = e
        })
      },
      position(row) {
        this.positionData.choose = []
        this.positionData.show = true
        this.positionData.row = row
        queryPositionContent({
          artId: row.id,
          model: this.category.model
        }).then(e => {
          if(e.length > 0){
            console.log(e)
            e.forEach(e => {
              this.positionData.choose.push(e.positionId);
            })
          }

        })
      },
      del(row) {
        this.$confirm(`此操作将永久删除《${row.title}》, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delContent(this.$route.params.categoryId, row.id).then(e => {
            this.getRows();
          }).catch(e => {
            this.$message.error(e);
          })
        }).catch(() => {
          console.log('取消删除')
        });
      },
    },
    created() {
      this.getRows();
      this.getCategory();
    }
  }
</script>
