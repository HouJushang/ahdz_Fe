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
      <el-form-item label="职位" prop="name">
        <el-input v-model="formData.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="工作性质" prop="xingzhi">
        <el-input v-model="formData.xingzhi" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="工作经验" prop=jingyan>
        <el-input v-model="formData.jingyan" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="招聘人数" prop="renshu">
        <el-input v-model="formData.renshu" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="学历要求" prop="xueli">
        <el-input v-model="formData.xueli" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="年龄要求" prop="nianling">
        <el-input v-model="formData.nianling" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="薪酬" prop="xinchou">
        <el-input v-model="formData.xinchou" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="工作地址" prop="address">
        <el-input v-model="formData.address" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="是否展示" prop="isShow">
        <el-radio v-model="formData.isShow" :label="0">不展示</el-radio>
        <el-radio v-model="formData.isShow" :label="1">展示</el-radio>
      </el-form-item>
      <div style="display: flex">
        <div style="width: 80px; padding-right: 12px; box-sizing: border-box; text-align: right">
          简介
        </div>
        <div style="flex: 1;">
          <UE :config=config ref="ue" :default-msg="formData.content"></UE>
        </div>
      </div>
    </el-form>
    <el-button style="margin-left: 80px; margin-top: 12px;" type="primary" @click="submit">提交</el-button>
  </section>
</template>
<script>
  import UE from '../components/ue'
  import {baseUrl} from '../config'
  import {queryOneJob, addJob, updateJob} from "../api/job"

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
          isShow: 0
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
        this.formData.xiangqing = this.$refs.ue.getUEContent();

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
          updateJob(this.formData).then(e => {
            this.$router.push({name: 'job'})
          }).catch(e => {
            this.$message.error(e);
          })
        } else {
          addJob(this.formData).then(e => {
            this.$router.push({name: 'job'})
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
        queryOneJob({
          id: this.$route.params.id
        }).then(e => {
          this.formData = e;
        })
      }
    }
  }
</script>
