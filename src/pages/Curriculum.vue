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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" size="mini" style="width: 500px">
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
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif等图片文件，推荐上传297*223px比例的图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频" prop="origin">
        <el-upload class="upload-demo" :before-upload="beforeVideoUpload" :action="baseUrl + 'upload'" :on-success="handleSuccess" multiple :limit="1">
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-upload>
        <el-input v-model="formData.video" placeholder="视频地址" size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-top: 10px;" @click="submit" :disabled="videoLoading">提交</el-button>
        <el-button type="warning" style="margin-top: 10px;" @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import Tinymce from '../components/Tinymce/'
  import {baseUrl, baseHost, uploadUrl} from '../config'
  import uploadKey from '../api/uploadKey'
  import {queryOneContent, addContent, updateContent} from "../api/content"

  export default {
    name: 'news_page',
    data() {
      return {
        baseUrl,
        baseHost,
        uploadUrl,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 400
        },
        videoLoading: false,
        formData: {
          title: '',
          author: '',
          origin: '',
          video: '',
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
          this.formData.thumb = res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      beforeVideoUpload() {
        this.videoLoading = true
      },
      handleSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.video = res.data.url
        } else {
          this.$message.error('视频上传失败！');
        }
        this.videoLoading = false
      },
      goBack() {
        window.history.go(-1)
      },
      submit() {
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
      Tinymce
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
       uploadKey().then(e => {
         this.postData.token = e
       })
    }
  }
</script>
