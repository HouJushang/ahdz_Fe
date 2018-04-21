<style lang="sass">
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
  <section class="news_page">
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" style="width: 400px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="formData.author" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="origin">
        <el-input v-model="formData.origin" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="thumb">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.thumb" :src="formData.thumb" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <UE :config=config ref="ue" default-msg=""></UE>
    <el-button type="primary" @click="submit">提交</el-button>
  </section>
</template>
<script>
  import UE from '../components/ue'
  import {baseUrl} from '../config'
  import {queryContent, addContent, delContent, updateContent} from "../api/content"
  export default {
    name: 'news_page',
    data() {
        return {
          baseUrl,
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 400
          },
          formData: {
            title: '',
            author: '',
            origin: '',
            thumb: '',
          },
          rules: {
            title: [
              {required: true, message: '标题必填', trigger: 'blur'},
            ]
          }
        }
    },
    methods: {
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
      handleAvatarSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.thumb = baseUrl + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      submit() {
        this.formData.content = this.$refs.ue.getUEContent();
        this.formData.categoryId = this.$route.params.categoryId;
        addContent(this.$route.params.categoryId, this.formData).then(e => {
          console.log(e)
        }).catch(e => {
          this.$message.error(e);
        })
      }
    },
    components: {
      UE
    }
  }
</script>
