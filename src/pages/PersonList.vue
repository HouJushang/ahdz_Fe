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
      <p>个人列表</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加用户</el-button>
    </div>
    <el-table :data="listData.rows" border style="width: 100%" size="mini">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column label="用户类型">
        <template slot-scope="scope">
          {{['个人', '企业'][scope.row.type]}}
        </template>
      </el-table-column>
      <!--<el-table-column prop="createdAt" label="创建时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{dateFormat(new Date(scope.row.createdAt))}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="updatedAt" label="最后修改时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{dateFormat(new Date(scope.row.updatedAt))}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)">基本信息</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goDetail(scope.row)">扩展信息</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="formData.type" :disabled="dialogType == 1" :label="0">个人</el-radio>
          <el-radio v-model="formData.type" :disabled="dialogType == 1" :label="1">企业</el-radio>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
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
    },
    created() {
      this.getRows();
    }
  }
</script>
