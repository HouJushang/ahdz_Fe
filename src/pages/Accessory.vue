<style lang="sass">
  .position_page
    .position_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="position_page">
    <div class="position_page_top">
      <p>附件管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加附件</el-button>
    </div>
    <el-form :inline="true" :model="filterForm" ref="filterForm" class="demo-form-inline" size="mini">
      <el-form-item label="标题">
        <el-input v-model="filterForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="file" label="文件地址"></el-table-column>
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
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin: 20px 0 10px 0;"
                   background page-sizes :page-sizes="[10, 20, 50, 100]" :page-size="this.pageInfo.pageSize"
                   layout="total, sizes, prev, pager, next"
                   @size-change="sizeChange" @current-change="currentChange"
                   :total="listData.count">
    </el-pagination>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="文件" v-if="dialogType == 0" prop="file">
          <input type="hidden" v-model="file">
          <el-upload
            class="upload-demo"
            :action="baseUrl + 'upload'"
            :limit="1"
            :on-success="handleSuccess"
            multiple>
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import {queryAccessory, addAccessory, delAccessory, updateAccessory} from '../api/accessory'
  import dateFormat from '../util/dateFormat'
  import {baseUrl, baseHost} from '../config'

  export default {
    name: 'position_page',
    data () {
      return {
        dateFormat,
        baseUrl,
        baseHost,
        file: null,
        dialogShow: false,
        dialogType: 0,
        formData: {},
        listData: {
          count: 0,
          rows: []
        },
        rules: {
          title: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          file: [
            {required: true, message: '文件必选', trigger: 'blur'},
          ],
        },
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        filterForm: {
          title: ''
        },
        filterFormCopy: {},
        filterFormCopyEmpty: {},
      }
    },
    methods :{
      handleSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.file = res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      showAddForm() {
        this.formData = {}
        this.showForm(0)
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
      showEditForm(data) {
        Object.assign(this.formData, data)
        this.showForm(1)
      },
      showForm(type) {
        this.dialogType = type
        this.dialogShow = true
        this.$refs['form'] && this.$refs['form'].clearValidate()
      },
      goDetail(row){
        this.$router.push({name: 'positionContent', params: {id: row.id}})
      },
      showDel(data) {
        this.$confirm('此操作将删除该该附件, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
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
      del(data) {
        delAccessory({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        this.loading = true
        queryAccessory({
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          },
          filter: this.filterFormCopy
        }).then(e => {
          this.listData = e;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.dialogType == 0 ? this.addSubmit() : this.editSubmit();
          }
        });
      },
      addSubmit() {
        addAccessory(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updateAccessory(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          console.log(e)
        })
      },
    },
    created() {
      Object.assign(this.filterFormCopy, this.filterForm)
      Object.assign(this.filterFormCopyEmpty, this.filterForm)
      this.getRows();
    }
  }
</script>
