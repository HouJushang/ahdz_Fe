<style lang="sass">
  .admmin_page
    overflow: hidden
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
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加用户</el-button>
    </div>
    <el-form :inline="true" :model="filterForm" ref="filterForm" class="demo-form-inline" size="mini">
      <el-form-item label="手机号码">
        <el-input v-model="filterForm.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="filterForm.companyName" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="formData.type" :disabled="true" :label="0">个人</el-radio>
          <el-radio v-model="formData.type" :disabled="true" :label="1">企业</el-radio>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="公司ID"></el-table-column>
      <el-table-column prop="user.phone" label="手机号"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column label="推荐位">
        <template slot-scope="scope">
          <span v-for="item in listPosition[scope.$index]">
            {{item.title}},
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="380" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row.user)">基本信息</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goDetail(scope.row)">扩展信息</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)">删除</el-button>
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
    <el-dialog title="选择推荐位" :visible.sync="positionData.show" width="40%">
      <el-checkbox-group v-model="positionData.choose">
        <el-checkbox v-for="item in positionData.data" :label="item.id" style="margin-left: 10px;">{{item.title}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positionData.show = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="positionSubmit" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import {queryUser, delUser2, addUser, updateUser} from '../api/user'
  import {addPositionContent, queryPositionContent, positionDetail} from '../api/positionContent'
  import {queryPosition} from '../api/position'
  import {queryCompanyList} from '../api/company'
  export default {
    name: 'user_page',
    data () {
      return {
        dialogShow: false,
        dialogType: 0,
        listData: {
          count: 0,
          rows: []
        },
        listPosition: [],
        formData: {
          phone: '',
          password: '',
          type: 0
        },
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        filterForm: {
          phone: '',
          companyName: ''
        },
        filterFormCopy: {},
        filterFormCopyEmpty: {},
        rules: {
          phone: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
        },
        positionData: {
          show: false,
          data: [],
          choose: [],
          row: null,
        },
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
      showAddForm() {
        this.formData = {type: 1}
        this.showForm(0)
      },
      showEditForm(data) {
        console.log(data)
        Object.assign(this.formData, data)
        this.showForm(1)
      },
      showForm(type) {
        this.dialogType = type
        this.dialogShow = true
        this.$refs['form'] && this.$refs['form'].clearValidate()
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
        addUser(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updateUser(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          console.log(e)
        })
      },
      showDel(row) {
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(row)
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
      del(row) {
        this.$confirm(`此操作将永久删除《${row.user.phone}》, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser2({
            id: row.id,
            userId: row.user.id
          }).then(e => {
            this.getRows();
          }).catch(e => {
            this.$message.error(e);
          })
        }).catch(() => {
          console.log('取消删除')
        });
      },
      goDetail(row) {
        this.$router.push({name: 'company', params: {userId: row.user.id}})
      },
      getRows() {
        queryCompanyList({
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          },
          filter: this.filterFormCopy
        }).then(e => {
          var promiseArr = []
          e.rows.forEach(f => {
            promiseArr.push(positionDetail(f.id))
          })
          Promise.all(promiseArr).then(g => {
            this.listData = e
            this.listPosition = g
          })
        })
      },
      getPostion() {
        queryPosition({
          model: 'company'
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
          model: 'company'
        }).then(e => {
          if(e.length > 0){
            console.log(e)
            e.forEach(e => {
              this.positionData.choose.push(e.positionId);
            })
          }

        })
      },
      positionSubmit() {
        addPositionContent({
          id: this.positionData.row.id,
          model: 'company',
          choose: this.positionData.choose
        }).then(e =>{
          this.positionData.show = false;
        }).catch(e => {
          this.$message.error(e);
        })
      },
    },
    created() {
      Object.assign(this.filterFormCopy, this.filterForm)
      Object.assign(this.filterFormCopyEmpty, this.filterForm)
      this.getRows();
      this.getPostion();
    }
  }
</script>
