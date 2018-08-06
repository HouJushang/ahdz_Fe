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
      <p>个人列表</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加用户</el-button>
    </div>
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
      <el-table-column prop="id" label="用户ID"></el-table-column>
      <el-table-column prop="user.phone" label="手机号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row.user)">基本信息</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goDetail(scope.row)">扩展信息</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)">删除</el-button>
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
  import {queryUser, delUser, addUser, updateUser} from '../api/user'
  import {getPersonList} from '../api/person'
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
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        formData: {
          phone: '',
          password: '',
          type: 0
        },
        filter: {
        },
        rules: {
          phone: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
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
        this.formData = {type: 0}
        this.showForm(0)
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
      del(row) {
        this.$confirm(`此操作将永久删除《${row.user.phone}》, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({
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
        this.$router.push({name: 'person', params: {userId: row.user.id}})
      },
      getRows() {
        getPersonList(this.$route.params.categoryId, {
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
