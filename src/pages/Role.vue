<style lang="sass">
  .role_page
    .role_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="role_page">
    <div class="role_page_top">
      <p>角色管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加角色</el-button>
    </div>
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="lastIp" label="最后登录IP"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEditForm(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="showDel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" size="mini"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import {queryRole, delRole, addRole, updateRole} from '../api/role'
  export default {
    name: 'role_page',
    data () {
      return {
        dialogShow: false,
        dialogType: 0,
        formData: {},
        rows: [],
        rules: {
          name: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'}
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
        addRole(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        })
      },
      showDel(data) {
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delRole({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryRole().then(e => {
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
        addRole(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updateRole(this.formData).then(e => {
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
