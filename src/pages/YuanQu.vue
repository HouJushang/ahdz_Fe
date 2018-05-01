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
      <div class="formBody">
        <div class="formBodyLeft">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="formData.address" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="面积" prop="mianji">
            <el-input v-model="formData.mianji" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="concatPeople">
            <el-input v-model="formData.concatPeople" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="配套" prop="peitao">
            <el-input v-model="formData.peitao" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="formData.phone" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="thumb">
            <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="formData.thumb" :src="formData.thumb" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="formBodyRight">
          <el-form-item label="园区服务">
            <el-input type="textarea" v-model="formData.fuwu"></el-input>
          </el-form-item>
          <el-form-item label="园区优势">
            <el-input type="textarea" v-model="formData.youshi"></el-input>
          </el-form-item>
          <el-form-item label="入园条件">
            <el-input type="textarea" v-model="formData.tiaojian"></el-input>
          </el-form-item>
          <!--<UE :config=config ref="ue1" :default-msg="formData.fuwu"></UE>-->
          <!--<UE :config=config ref="ue2" :default-msg="formData.youshi"></UE>-->
          <!--<UE :config=config ref="ue3" :default-msg="formData.tiaojian"></UE>-->
        </div>
      </div>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </section>
</template>
<script>
  import UE from '../components/ue'
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
            title: '',
            content: '',
            address: '',
            thumb: '',
            mianji: '',
            concatPeople: '',
            peitao: '',
            phone: '',
            fuwu: '',
            youshi: '',
            tiaojian: ''
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
          this.formData.thumb = baseUrl + res.data.url
        } else {
          this.$message.error('图片上传失败！');
        }
      },
      submit() {
        // this.formData.fuwu = this.$refs.ue1.getUEContent();
        // this.formData.youshi = this.$refs.ue2.getUEContent();
        // this.formData.tiaojian = this.$refs.ue3.getUEContent();
        this.formData.categoryId = this.$route.params.categoryId;

        var isPass = false
        this.$refs['form'].validate((valid) => {
          if (valid) {
            isPass = true;
          } else {
            isPass = false;
          }
        });
        if(!isPass){
          return false;
        }

        if(this.$route.params.id){
          updateContent(this.$route.params.categoryId, this.formData).then(e => {
            this.$message.success('修改成功');
            this.$router.push({name: 'contentList', params: {categoryId: this.$route.params.categoryId}})
          }).catch(e => {
            this.$message.error(e);
          })
        }else{
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
