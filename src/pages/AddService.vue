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
      <el-form-item label="简介" prop="description">
        <el-input type="textarea" rows="5" v-model="formData.description" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="公司ID" prop="companyId">
        <el-input v-model="formData.companyId" size="mini"></el-input>
      </el-form-item>
      <!--<el-form-item label="服务方式" prop="fanshi">-->
        <!--<el-input v-model="formData.fanshi" size="mini"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="价格" prop="jiage">
        <el-input v-model="formData.jiage" size="mini"></el-input>
      </el-form-item>
      <!--<el-form-item label="服务对象" prop="duixiang">-->
        <!--<el-input v-model="formData.duixiang" size="mini"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="服务类别" prop=leibie>
          <el-select v-model="formData.leibie" placeholder="请选择" size="mini">
            <el-option label="金融服务" value="金融服务"></el-option>
            <el-option label="电商代运营" value="电商代运营"></el-option>
            <el-option label="营销推广" value="营销推广"></el-option>
            <el-option label="设计摄影" value="设计摄影"></el-option>
            <el-option label="物流服务" value="物流服务"></el-option>
            <el-option label="IT互联网服务" value="IT互联网服务"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="服务范围" prop="fanwei">
        <el-input v-model="formData.fanwei" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="lianxi">
        <el-input v-model="formData.lianxi" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="是否展示" prop="isShow">
        <el-radio v-model="formData.isShow" :label="0">不展示</el-radio>
        <el-radio v-model="formData.isShow" :label="1">展示</el-radio>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.image" :src="formData.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">建议上传图片尺寸为250*250px</div>
        </el-upload>
      </el-form-item>
      <div style="display: flex">
        <div style="width: 80px; padding-right: 12px; box-sizing: border-box; text-align: right">
          简介
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
  import Tinymce from '../components/Tinymce/'
  import {baseUrl, baseHost} from '../config'
  import {queryOneService, addService, updateService} from "../api/service"

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
          isShow: 0,
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
          updateService(this.formData).then(e => {
            this.$router.push({name: 'service'})
          }).catch(e => {
            this.$message.error(e);
          })
        } else {
          addService(this.formData).then(e => {
            this.$router.push({name: 'service'})
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
          this.formData.image = res.data.url
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
        queryOneService({
          id: this.$route.params.id
        }).then(e => {
          this.formData = e;
        })
      }
    }
  }
</script>
