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
      <p>管理员管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加管理员</el-button>
    </div>
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEditForm(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="showDel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="登录名" prop="username">
          <el-input v-model="formData.username" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" size="mini"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import {queryAdmin, delAdmin, addAdmin, updateAdmin} from '../api/admin'
  import dateFormat from '../util/dateFormat'
  export default {
    name: 'admmin_page',
    data () {
      return {
        dateFormat,
        dialogShow: false,
        dialogType: 0,
        formData: {},
        rows: [],
        rules: {
          username: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods :{
      showAddForm() {
        this.formData = {}
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
      addSubmit() {
        addAdmin(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        })
      },
      showDel(data) {
        this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delAdmin({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryAdmin().then(e => {
          this.rows = e;
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
        addAdmin(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updateAdmin(this.formData).then(e => {
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
