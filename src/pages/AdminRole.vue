<style lang="sass">
  .adminrole_page
    .adminrole_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="adminrole_page">
    <div class="adminrole_page_top">
      <p>角色分配管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">分配</el-button>
    </div>
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="admin.username" label="管理员"></el-table-column>
      <el-table-column prop="role.name" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="管理员" prop="adminId">
          <el-select  v-model.number="formData.adminId" size="mini">
            <el-option v-for="item in adminRows" :value="item.id" :key="item.id" :label="item.username"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="formData.roleId" size="mini">
            <el-option v-for="item in roleRows" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import {queryAdmin} from '../api/admin'
  import {queryRole} from '../api/role'
  import {addAdminRole, queryAdminRole, delAdminRole, updateAdminRole} from '../api/adminRole'
  export default {
    name: 'adminrole_page',
    data () {
      return {
        dialogShow: false,
        dialogType: 0,
        formData: {
          adminId: 0,
          roleId: 0
        },
        rows: [],
        adminRows: [],
        roleRows: [],
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
        addAdminRole(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        })
      },
      showDel(data) {
        this.$confirm('解除该绑定,是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delAdminRole({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryAdminRole().then(e => {
          this.rows = e;
        })
      },
      getAdminRows() {
        queryAdmin().then(e => {
          this.adminRows = e;
        })
      },
      getRoleRows() {
        queryRole().then(e => {
          this.roleRows = e;
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
        addAdminRole(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updateAdminRole(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          console.log(e)
        })
      },
    },
    created() {
        this.getRows();
        this.getAdminRows();
        this.getRoleRows();
    }
  }
</script>
