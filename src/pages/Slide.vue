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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" style="width: 450px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="formData.link" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.image" :src="formData.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip" v-if="$route.params.categoryId == 19">只能上传jpg/png/gif等图片文件，推荐上传90*90px比例的图片</div>
          <div slot="tip" class="el-upload__tip" v-else>只能上传jpg/png/gif等图片文件，推荐上传500*300px比例的图片</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit" size="mini">提交</el-button>
    <el-button type="warning" @click="goBack" size="mini">取消</el-button>

  </section>
</template>
<script>
  import {baseUrl} from '../config'
  import {queryOneContent, addContent, updateContent} from "../api/content"

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
          image: '',
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
          this.$message.error('上传头像图片只能是 JPG png gif格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {
        if (res.code == 'success') {
          this.formData.image = baseUrl + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      goBack() {
        window.history.go(-1)
      },
      submit() {
        this.formData.categoryId = this.$route.params.categoryId;
        if (!this.$route.params.id) {
          addContent(this.$route.params.categoryId, this.formData).then(e => {
            this.$router.push({name: 'contentList', params: {categoryId: this.$route.params.categoryId}})
          }).catch(e => {
            this.$message.error(e);
          })
        } else{
          updateContent(this.$route.params.categoryId, this.formData).then(e => {
            this.$message.success('修改成功');
            this.$router.push({name: 'contentList', params: {categoryId: this.$route.params.categoryId}})
          }).catch(e => {
            this.$message.error(e);
          })
        }
      }
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
