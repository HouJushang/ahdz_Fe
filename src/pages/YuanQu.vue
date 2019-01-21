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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city" size="mini">
        <el-select v-model="formData.city">
          <el-option value="合肥市" label="合肥市"></el-option>
          <el-option value="亳州市" label="亳州市"></el-option>
          <el-option value="淮北市" label="淮北市"></el-option>
          <el-option value="宿州市" label="宿州市"></el-option>
          <el-option value="蚌埠市" label="蚌埠市"></el-option>
          <el-option value="阜阳市" label="阜阳市"></el-option>
          <el-option value="淮南市" label="淮南市"></el-option>
          <el-option value="滁州市" label="滁州市"></el-option>
          <el-option value="六安市" label="六安市"></el-option>
          <el-option value="芜湖市" label="芜湖市"></el-option>
          <el-option value="马鞍山市" label="马鞍山市"></el-option>
          <el-option value="安庆市" label="安庆市"></el-option>
          <el-option value="宣城市" label="宣城市"></el-option>
          <el-option value="铜陵市" label="铜陵市"></el-option>
          <el-option value="池州市" label="池州市"></el-option>
          <el-option value="黄山市" label="黄山市"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="园区类型">
        <el-select v-model="formData.type" placeholder="请选择" size="mini">
          <el-option
            v-for="item in ['国家级电商产业园区', '省级电商产业园区', '电商产业园区']"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.thumb" :src="formData.thumb" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif等图片文件，推荐上传300*220px比例的图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="园区服务">
        <tinymce :height="300" ref="tinymce" v-model="formData.fuwu"></tinymce>
        <!--<el-input type="textarea" :rows="8" v-model="formData.fuwu"></el-input>-->
      </el-form-item>
      <el-form-item label="园区优势">
        <tinymce :height="300" ref="tinymce" v-model="formData.youshi"></tinymce>
      </el-form-item>
      <el-form-item label="入园条件">
        <tinymce :height="300" ref="tinymce" v-model="formData.tiaojian"></tinymce>
      </el-form-item>
      <!--<UE :config=config ref="ue1" :default-msg="formData.fuwu"></UE>-->
      <!--<UE :config=config ref="ue2" :default-msg="formData.youshi"></UE>-->
      <!--<UE :config=config ref="ue3" :default-msg="formData.tiaojian"></UE>-->
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import {baseUrl, baseHost} from '../config'
  import tinymce from '../components/Tinymce/'
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
    components: {
      tinymce
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
      goBack() {
        window.history.go(-1)
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
