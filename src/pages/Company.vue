<style lang="sass" scoped>
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
    .formBody
      display: flex
      .formBodyLeft
        width: 400px
        box-sizing: border-box
        padding-right: 30px
      .formBodyRight
        flex: 1
</style>
<template>
  <section class="news_page">
    <el-form ref="form" :model="formData" :rules="rules" label-width="200px" style="width: 800px">
      <el-form-item label="logo" prop="logo">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.logo" :src="baseHost + formData.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="formData.companyName" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="组织机构代码或工商注册号" prop="zzjgdm">
        <el-input v-model="formData.zzjgdm" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="企业注册类型" prop="qyzclx">
        <el-input v-model="formData.qyzclx" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="行政区划代码" prop="xzdm">
        <el-input v-model="formData.xzdm" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="单位性质" prop="dwxz">
        <el-input v-model="formData.dwxz" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="开业时间" prop="kysj">
        <el-input v-model="formData.kysj" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="控股情况" prop="kgqk">
        <el-input v-model="formData.kgqk" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人" prop="fddbr">
        <el-input v-model="formData.fddbr" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="行业代码" prop="hedm">
        <el-input v-model="formData.hedm" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="yzbm">
        <el-input v-model="formData.yzbm" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="公司网址" prop="gswz">
        <el-input v-model="formData.gswz" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="通讯地址" prop="txdz">
        <el-input v-model="formData.txdz" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="主要产品或主营业务" prop="zycp">
        <el-input v-model="formData.zycp" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="lxrname">
        <el-input v-model="formData.lxrname" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="lxrphone">
        <el-input v-model="formData.lxrphone" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="lxremail">
        <el-input v-model="formData.lxremail" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div style="display: flex">
      <div style="width: 200px; padding-right: 12px; box-sizing: border-box; text-align: right">
        企业简介
      </div>
      <div style="flex: 1;">
        <tinymce :height="300" ref="tinymce" v-model="formData.qyjj"></tinymce>
      </div>
    </div>
    <div style="display: flex">
      <div style="width: 200px; padding-right: 12px; box-sizing: border-box; text-align: right">

      </div>
      <div style="flex: 1;">
        <el-button type="primary" style="margin-top: 10px;" @click="submit">提交</el-button>
        <el-button type="warning" style="margin-top: 10px;" @click="goBack">取消</el-button>
      </div>
    </div>
  </section>
</template>
<script>
  import Tinymce from '../components/Tinymce/'
  import {baseUrl, baseHost} from '../config'
  import {getcompanyById, setCompany} from "../api/company"

  export default {
    name: 'news_page',
    data() {
      return {
        baseUrl,
        baseHost,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 400
        },
        formData: {
          logo: '',
          companyName: '',
          zzjgdm: '',
          qyzclx: '',
          xzdm: '',
          dwxz: '',
          kysj: '',
          kgqk: '',
          fddbr: '',
          hedm: '',
          yzbm: '',
          gswz: '',
          txdz: '',
          zycp: '',
          qyjj: '',
          lxrname: '',
          lxrphone: '',
          chuanzhen: '',
          lxremail: '',
        },
        rules: {
          companyName: [
            {required: true, message: '标题必填', trigger: 'blur'},
          ],
          lxrname: [
            {required: true, message: '联系人必填', trigger: 'blur'},
          ],
          lxrphone: [
            {required: true, message: '电话必填', trigger: 'blur'},
          ],
          lxremail: [
            {required: true, message: '联系人必填', trigger: 'blur'},
          ],
          lxrname: [
            {required: true, message: '联系人必填', trigger: 'blur'},
          ],
          txdz: [
            {required: true, message: '地址必填', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG png gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.logo = "/" + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      goBack() {
        window.history.go(-1)
      },
      submit() {
        var isPass = false
        this.$refs['form'].validate((valid) => {
          if (valid) {
            isPass = true;
          } else {
            isPass = false;
          }
        });
        if (!isPass) {
          return false;
        }
        setCompany(this.$route.params.userId, this.formData).then(e => {
          this.$router.push({name: 'companyList'})
          this.$message.success('操作成功！');
        }).catch(e => {
          this.$message.error(e.message);
        })
      }
    },
    components: {
      Tinymce
    },
    created() {
      getcompanyById(this.$route.params.userId).then(e => {
        if (e != null) {
          this.formData = e;
        }
      })
    }
  }
</script>
