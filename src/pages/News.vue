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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" style="width: 500px;">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="description">
        <el-input type="textarea" :rows="5" v-model="formData.description" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="formData.author" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="origin">
        <el-input v-model="formData.origin" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="thumb">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.thumb" :src="baseHost + formData.thumb" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div style="width: 80px; text-align: right; font-size: 14px; color: #606266; margin: 15px 0; box-sizing: border-box; padding-right: 12px">
      内容
    </div>
    <UE :config=config ref="ue" :defaultMsg="formData.content"></UE>
    <el-button type="primary" style="margin-top: 10px;" @click="submit">提交</el-button>
    <el-button type="warning" style="margin-top: 10px;" @click="goBack">取消</el-button>
  </section>
</template>
<script>
  import UE from '../components/ue'
  import {baseUrl, baseHost} from '../config'
  import {queryOneContent, addContent, updateContent} from "../api/content"

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
          title: '',
          author: '',
          origin: '',
          content: '',
          thumb: '',
          description: ''
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
          this.formData.thumb = "/" + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      goBack() {
        window.history.go(-1)
      },
      submit() {
        this.formData.content = this.$refs.ue.getUEContent();
        this.formData.categoryId = this.$route.params.categoryId;

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
          updateContent(this.$route.params.categoryId, this.formData).then(e => {
            this.$message.success('修改成功');
            this.$router.push({name: 'contentList', params: {categoryId: this.$route.params.categoryId}})
          }).catch(e => {
            this.$message.error(e);
          })
        } else {
          addContent(this.$route.params.categoryId, this.formData).then(e => {
            this.$router.push({name: 'contentList', params: {categoryId: this.$route.params.categoryId}})
          }).catch(e => {
            this.$message.error(e);
          })
        }
      }
    },
    components: {
      UE
    },
    created() {
      if (this.$route.params.id) {
        queryOneContent({
          categoryId: this.$route.params.categoryId,
          id: this.$route.params.id
        }).then(e => {
          this.formData = e;
        })
      }
    }
  }
</script>
