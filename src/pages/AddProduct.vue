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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="公司ID" prop="companyId">
        <el-input v-model="formData.companyId" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="jiage">
        <el-input v-model="formData.jiage" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="商品规格" prop="guige">
        <el-input v-model="formData.guige" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="商品产地" prop=chandi>
        <el-input v-model="formData.chandi" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="商品链接" prop="link">
        <el-input v-model="formData.link" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="是否展示" prop="isShow">
        <el-radio v-model="formData.isShow" :label="0">不展示</el-radio>
        <el-radio v-model="formData.isShow" :label="1">展示</el-radio>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.image" :src="baseHost + formData.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">建议上传图片尺寸为250*250px</div>
        </el-upload>
      </el-form-item>
      <div style="display: flex">
        <div style="width: 80px; padding-right: 12px; box-sizing: border-box; text-align: right; font-size: 14px; ">
          商品详情
        </div>
        <div style="flex: 1;">
          <tinymce :height="300" ref="tinymce" v-model="formData.content"></tinymce>
        </div>
      </div>
    </el-form>
    <el-button style="margin-left: 80px; margin-top: 12px;" type="primary" @click="submit">提交</el-button>
  </section>
</template>
<script>
  // import UE from '../components/ue'
  import {baseHost, baseUrl} from '../config'
  import {queryOneProduct, addProduct, updateProduct} from "../api/product"
  import Tinymce from '../components/Tinymce/'

  export default {
    name: 'news_page',
    data() {
      return {
        baseHost,
        baseUrl,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 400
        },
        formData: {
          isShow: 0,
          image: ''
        },
        rules: {
          title: [
            {required: true, message: '标题必填', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
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

        if (this.$route.params.id) {
          updateProduct(this.formData).then(e => {
            this.$router.push({name: 'product'})
          }).catch(e => {
            this.$message.error(e);
          })
        } else {
          addProduct(this.formData).then(e => {
            this.$router.push({name: 'product'})
          }).catch(e => {
            this.$message.error(e);
          })
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG png gif格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.image = '/' + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
    },
    components: {
      Tinymce
    },
    created() {
      if (this.$route.params.id) {
        queryOneProduct({
          id: this.$route.params.id
        }).then(e => {
          this.formData = e;
        })
      }
    }
  }
</script>
