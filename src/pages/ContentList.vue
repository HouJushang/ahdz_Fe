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
      <p>{{category.name}}--列表</p>
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="addContent" style="float: right;">发布</el-button>
    </div>
    <div>
      <el-form :inline="true" :model="filterForm" ref="filterForm" class="demo-form-inline" size="mini">
        <el-form-item label="标题">
          <el-input v-model="filterForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核">
          <el-select v-model="filterForm.check" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="未通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="success" @click="onClear">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :loading="loading" :data="listData.rows" border style="width: 100%" size="mini" v-if="category.label">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column :prop="category.main" :label="category.label">
        <template slot-scope="scope">
          <a style="color: black" :href="`${homeUrl}content/${category.id}/${scope.row.id}`" target="_blank">{{ scope.row[category.main] }}</a>
        </template>
      </el-table-column>
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
          <el-tag :type="['info', 'success', 'danger'][scope.row.status]">{{['不显示', '显示', '隐藏'][scope.row.status]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="check" label="审核"  width="80">
        <template slot-scope="scope">
          <el-tag :type="['info', 'success', 'danger'][scope.row.check]">{{['待审核', '通过', '未通过'][scope.row.check]}}</el-tag>
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
          <el-button type="danger" icon="el-icon-delete"  size="mini" @click="del(scope.row)"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-view"  @click="check(scope.row)"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-star-off" v-if="positionData.data.length > 0"  @click="position(scope.row)"></el-button>
          <el-button type="success" size="mini" icon="el-icon-success" v-if="(scope.row.check == 2 || scope.row.check == 0) && rolename == '审核员'"  @click="shenhe(scope.row, 1)"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-error" v-if="(scope.row.check == 1 || scope.row.check == 0) && rolename == '审核员'" @click="shenhe(scope.row, 2)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin: 20px 0 10px 0;"
      background page-sizes :page-sizes="[10, 20, 50, 100]" :page-size="this.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next"
      @size-change="sizeChange" @current-change="currentChange"
      :total="listData.count">
    </el-pagination>
    <el-dialog :title="`《${checkDialog.title}》`" :visible.sync="checkDialog.show" width="30%">
      <div>
        <el-radio v-model="checkDialog.status" :label="1">显示</el-radio>
        <el-radio v-model="checkDialog.status" :label="2">隐藏</el-radio>
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
  import {queryContent, delContent, checkContent, updateContent, checkContentStatus} from "../api/content";
  import {addPositionContent, queryPositionContent} from '../api/positionContent'
  import dateFormat from '../util/dateFormat'
  import {queryPosition} from '../api/position'
  import {filter} from '../util/objectUtil'
  import {homeUrl} from "../config";

  export default {
    name: 'admmin_page',
    data () {
      return {
        rolename: localStorage.getItem('rolename'),
        homeUrl,
        dateFormat,
        category: {},
        loading: false,
        positionData: {
          show: false,
          data: [],
          choose: [],
          row: null,
        },
        filterForm: {
          title: '',
          status: '',
          check: ''
        },
        filterFormCopy: {},
        filterFormCopyEmpty: {},
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
      blurHander(e){
        const order = parseInt(e.target.value);
        if(!(order >= 0)){
          return false;
        }
        updateContent(this.category.id, {id: parseInt(e.target.getAttribute('idValue')), order: order}).then(e => {
          this.$message({
            message: '排序更新成功',
            type: 'success'
          });
        }).catch(e => {
          this.getRows()
        })
      },
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
        this.loading = true
        queryContent(this.$route.params.categoryId, {
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          },
          filter: filter(this.filterFormCopy)
        }).then(e => {
          this.listData = e;
          this.loading = false
        }).catch(() => {
          this.loading = false
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
        Object.assign(this.checkDialog, {
          show: true,
          title: row.title,
          id: row.id,
          status: row.status != 0 ? row.status : 1
        })
      },
      shenhe(row, check) {
        this.$confirm(['', `确认审核通过?`, '确认审核不通过？'][check]).then(() => {
          checkContentStatus(this.$route.params.categoryId, {
            id: row.id,
            check: check
          }).then(e => {
            this.getRows()
          }).catch(e => {
            this.$message.error(e);
          })
        }).catch(() => {
          console.log('cancel shanhe')
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
      onSubmit() {
        this.pageInfo.currentPage = 1
        Object.assign(this.filterFormCopy, this.filterForm)
        this.getRows()
      },
      onClear() {
        this.pageInfo.currentPage = 1;
        Object.assign(this.filterFormCopy, this.filterFormCopyEmpty)
        Object.assign(this.filterForm, this.filterFormCopyEmpty)
        this.getRows()
      },
      addContent(){
        this.$router.push({name: this.category.model, params: { categoryId: this.category.id }})
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
      Object.assign(this.filterFormCopy, this.filterForm)
      Object.assign(this.filterFormCopyEmpty, this.filterForm)
      this.getRows();
      this.getCategory();
    }
  }
</script>
