<style lang="sass">
  .category_page
    .category_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
    .avatar-uploader .el-upload
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
    .avatar-uploader .el-upload:hover
      border-color: #409EFF
    .avatar-uploader-icon
      font-size: 28px
      color: #8c939d
      width: 178px
      height: 178px
      line-height: 178px
      text-align: center
    .avatar
      width: 178px
      height: 178px
      display: block
</style>
<template>
  <section class="category_page">
    <div class="category_page_top">
      <p>栏目管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddForm">添加栏目</el-button>
    </div>

    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="template" label="模板"></el-table-column>
      <el-table-column prop="model" label="模型"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="keywords" label="关键词"></el-table-column>
      <el-table-column prop="role.name" label="审核"></el-table-column>
      <!--<el-table-column prop="createdAt" label="创建时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{dateFormat(new Date(scope.row.createdAt))}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="updatedAt" label="修改时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{dateFormat(new Date(scope.row.updatedAt))}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="栏目图片">-->
        <!--<template slot-scope="scope">-->
          <!--<img :src="scope.row.image" alt="" width="100" height="100">-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="['添加','编辑'][dialogType]" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="模板" prop="template">
          <el-input v-model="formData.template" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="审核角色" prop="roleId">
          <el-select v-model="formData.roleId" size="mini">
            <el-option :value="0" label="不需要审核"></el-option>
            <el-option v-for="item in roleRows" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模型" prop="model">
          <el-input v-model="formData.model" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="主显字段" prop="main">
          <el-input v-model="formData.main" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="主显名称" prop="label">
          <el-input v-model="formData.label" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="formData.keywords" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.image" :src="formData.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][dialogType]}}</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  import dateFormat from '../util/dateFormat'
  import {baseUrl} from '../config'
  import {queryCategory, delCategory, addCategory, updateCategory} from '../api/category'
  import {queryRole} from '../api/role'

  export default {
    name: 'category_page',
    data () {
      return {
        dateFormat,
        baseUrl,
        dialogShow: false,
        dialogType: 0,
        formDataEmpty: {
          name: '',
          image: '',
          template: '',
          model: '',
          description: '',
          roleId: 0,
          keywords: ''
        },
        formData: {
          name: '',
          image: '',
          template: '',
          model: '',
          description: '',
          roleId: 0,
          keywords: ''
        },
        rows: [],
        roleRows: [],
        rules: {
          name: [
            {required: true, message: '请输入角色名臣', trigger: 'blur'},
          ],
          template: [
            {required: true, message: '请输入模板', trigger: 'blur'},
          ],
          model: [
            {required: true, message: '请输入model', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.image = baseUrl + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      showAddForm() {
        Object.assign(this.formData, this.formDataEmpty)
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
        addCategory(this.formData).then(e => {
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
        delCategory({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryCategory().then(e => {
          this.rows = e;
        }).catch(e => {
          this.$message.error(e);
        })
      },
      getRoleRows() {
        queryRole().then(e => {
          this.roleRows = e
        }).catch(e => {
          this.$message.error(e);
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
        addCategory(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
      editSubmit() {
        updateCategory(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          this.$message.error(e);
        })
      },
    },
    created() {
      this.getRows();
      this.getRoleRows();
    }
  }
</script>
