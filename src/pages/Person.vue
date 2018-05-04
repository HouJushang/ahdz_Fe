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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" style="width: 400px;">
      <div class="formBody">
          <el-form-item label="姓名" prop="title">
            <el-input v-model="formData.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="idcard">
            <el-input v-model="formData.idcard" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="author">
            <el-radio v-model="formData.sex" :label="0">男</el-radio>
            <el-radio v-model="formData.sex" :label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="formData.address" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="thumb">
            <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </section>
</template>
<script>
  import {baseUrl} from '../config'
  import {getPersonById, setPerson} from "../api/person"

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
          name: '',
          idcard: '',
          sex: 0,
          address: '',
          avatar: '',
        },
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
          this.formData.avatar = baseUrl + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
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
        setPerson(this.$route.params.userId, this.formData).then(e => {
          this.$message.success('操作成功！');
        }).catch(e => {
          this.$message.error(e.message);
        })
      }
    },
    components: {
      UE
    },
    created() {
      getPersonById(this.$route.params.userId).then(e => {
        if(e != null){
          this.formData = e;
        }
      })
    }
  }
</script>
