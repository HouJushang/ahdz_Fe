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
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加用户</el-button>
    </div>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="company.id" label="ID"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column label="用户类型">
        <template slot-scope="scope">
          {{['个人', '企业'][scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)">基本信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {queryUser, delUser, addUser, updateUser} from '../api/user'
  import dateFormat from '../util/dateFormat'
  export default {
    name: 'user_page',
    data () {
      return {
        dateFormat,
        dialogShow: false,
        dialogType: 0,
        listData: {
          count: 0,
          rows: []
        },
        formData: {
          phone: '',
          password: '',
          type: 0
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
      goDetail(row) {
        this.$router.push({name: ['person', 'company'][row.type], params: {userId: row.id}})
      },
      currentChange(e){
        this.pageInfo.currentPage = e
        this.getRows();
      },
      showAddForm() {
        this.formData = {type: 0}
        this.showForm(0)
      },
      showForm(type) {
        this.dialogType = type
        this.dialogShow = true
        this.$refs['form'] && this.$refs['form'].clearValidate()
      },
      getRows() {
        queryUser(this.$route.params.categoryId, {
          pageInfo: {
            pageSize: this.pageInfo.pageSize,
            currentPage: this.pageInfo.currentPage
          }
        }).then(e => {
          this.listData = e;
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
      showEditForm(data) {
        Object.assign(this.formData, data)
        this.showForm(1)
      },
      del(row) {
        this.$confirm(`此操作将永久删除《${row.phone}》, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({
            id: row.id
          }).then(e => {
            this.getRows();
          }).catch(e => {
            this.$message.error(e);
          })
        }).catch(() => {
          console.log('取消删除')
        });
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
    },
    created() {
      this.getRows();
    }
  }
</script>
