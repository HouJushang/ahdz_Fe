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
      <p>推荐位列表</p>
    </div>
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="model" label="模型"></el-table-column>
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
          <el-button type="success" size="mini" @click="goDetail(scope.row)">推荐列表</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="模型" prop="model">
          <el-input v-model="formData.model" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="栏目ID" prop="categoryId">
          <el-input v-model="formData.categoryId" size="mini"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import {queryPosition, delPosition, addPosition, updatePosition} from '../api/position'
  import dateFormat from '../util/dateFormat'
  export default {
    name: 'position_page',
    data () {
      return {
        dateFormat,
        dialogShow: false,
        dialogType: 0,
        formData: {},
        rows: [],
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          model: [
            {required: true, message: '请输入模型', trigger: 'blur'},
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
      goDetail(row){
        this.$router.push({name: 'positionContent', params: {id: row.id}})
      },
      showDel(data) {
        this.$confirm('此操作将删除该推荐位, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delPosition({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryPosition().then(e => {
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
        addPosition(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updatePosition(this.formData).then(e => {
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
