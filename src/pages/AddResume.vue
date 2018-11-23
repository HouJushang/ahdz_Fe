<style lang="sass" scoped>
  .formTile
    font-size: 16px
  .avatar
    width: 178px
    height: 178px
    display: block
</style>
<template>
  <section>
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
      <h2>基本信息</h2>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload class="avatar-uploader" :action="baseUrl + 'upload'" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">建议上传图片尺寸为160*200px</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户ID" prop="personId">
        <el-input v-model="formData.personId" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formData.age" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="formData.sex" :label="0">男</el-radio>
        <el-radio v-model="formData.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="身高" prop="shengao">
        <el-input v-model="formData.shengao" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="结婚" prop=jiehun>
        <el-radio v-model="formData.jiehun" :label="0">是</el-radio>
        <el-radio v-model="formData.jiehun" :label="1">否</el-radio>
      </el-form-item>
      <el-form-item label="毕业学校" prop="school">
        <el-input v-model="formData.school" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="xueli">
        <el-input v-model="formData.xueli" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="zhuanye">
        <el-input v-model="formData.zhuanye" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="工作年限" prop="jiangyan">
        <el-input v-model="formData.jiangyan" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="formData.phone" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="zhuangtai">
        <el-select v-model="formData.zhuangtai"  placeholder="在职还是正在找工作" size="mini">
          <el-option label="目前正在找工作" value="目前正在找工作"></el-option>
          <el-option label="在职观望好机会" value="在职观望好机会"></el-option>
        </el-select>
        <!--<el-input v-model="formData.zhuangtai" placeholder="在职还是正在找工作" size="mini"></el-input>-->
      </el-form-item>
      <el-form-item label="通讯地址" prop="address">
        <el-input v-model="formData.address" size="mini"></el-input>
      </el-form-item>

      <h2>求职意向</h2>
      <el-form-item label="薪资" prop="xinzi">
        <el-input v-model="formData.xinzi" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="地点" prop="didian">
        <el-input v-model="formData.didian" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="zhiwei">
        <el-input v-model="formData.zhiwei" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="到岗时间" prop="shijian">
        <el-select v-model="formData.shijian"  placeholder="到岗时间" size="mini">
          <el-option label="无法确定" value="无法确定"></el-option>
          <el-option label="随时到岗" value="随时到岗"></el-option>
          <el-option label="一周" value="一周"></el-option>
          <el-option label="两周" value="两周"></el-option>
          <el-option label="三周" value="三周"></el-option>
          <el-option label="三周" value="三周"></el-option>
          <el-option label="一个月" value="一个月"></el-option>
          <el-option label="两个月" value="两个月"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作类型" prop="leixing">
        <el-select v-model="formData.leixing"  placeholder="工作类型" size="mini">
          <el-option label="全职" value="全职"></el-option>
          <el-option label="兼职" value="兼职"></el-option>
          <el-option label="实习" value="实习"></el-option>
          <el-option label="不限" value="不限"></el-option>
        </el-select>
        <!--<el-input v-model="formData.leixing" size="mini"></el-input>-->
      </el-form-item>
      <el-form-item label="行业" prop="hangye">
        <el-input v-model="formData.hangye" size="mini"></el-input>
      </el-form-item>

      <h2>教育经历</h2>
      <div v-for="(item, index) in formData.jiaoyu">
        <span class="formTile">教育经历 - {{index + 1}} </span><el-button type="danger" size="mini" @click="formData.jiaoyu.splice(index, 1)">删除</el-button>
        <el-form-item label="时间">
          <el-input v-model="item.startTime" size="mini" style="width: 120px"></el-input> -
          <el-input v-model="item.endTime" size="mini" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="item.school" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="zhuanye">
          <el-input v-model="item.zhuanye" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="xueli">
          <el-input v-model="item.xueli" size="mini"></el-input>
        </el-form-item>
      </div>
      <el-button style="margin-left: 80px; margin: 12px 0;" size="mini" type="success" @click="formData.jiaoyu.push({})">添加教育经历</el-button>


      <h2>工作经历</h2>
      <div v-for="(item, index) in formData.gongzuo">
        <span class="formTile">工作经验 - {{index + 1}} </span><el-button type="danger" size="mini" @click="formData.gongzuo.splice(index, 1)">删除</el-button>
        <el-form-item label="时间">
          <el-input v-model="item.startTime" size="mini" style="width: 120px"></el-input> -
          <el-input v-model="item.endTime" size="mini" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="companyName">
          <el-input v-model="item.companyName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="gangwei">
          <el-input v-model="item.gangwei" size="mini"></el-input>
        </el-form-item>
      </div>
      <el-button style="margin-left: 80px; margin: 12px 0;" size="mini" type="success" @click="formData.gongzuo.push({})">添加工作经验</el-button>


      <h2>培训经历</h2>
      <div v-for="(item, index) in formData.peixun">
        <span class="formTile">培训经历 - {{index + 1}} </span><el-button type="danger" size="mini" @click="formData.peixun.splice(index, 1)">删除</el-button>
        <el-form-item label="时间">
          <el-input v-model="item.startTime" size="mini" style="width: 120px"></el-input> -
          <el-input v-model="item.endTime" size="mini" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="kecheng">
          <el-input v-model="item.kecheng" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="培训机构" prop="jigou">
          <el-input v-model="item.jigou" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="培训内容" prop="content">
          <el-input v-model="item.content" type="textarea" size="mini"></el-input>
        </el-form-item>
      </div>
      <el-button style="margin-left: 80px; margin: 12px 0;" size="mini" type="success" @click="formData.peixun.push({})">添加培训经历</el-button>

      <h2>其他选项</h2>
      <el-form-item label="是否显示" prop=isShow>
        <el-radio v-model="formData.isShow" :label="0">停用</el-radio>
        <el-radio v-model="formData.isShow" :label="1">显示</el-radio>
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 80px; margin-top: 12px;" type="primary" size="mini" @click="submit">提交</el-button>
  </section>
</template>
<script>
  import {baseUrl,baseHost} from '../config'
  import {queryOneResume, addResume, updateResumeAll} from "../api/resume"

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
          sex: 0,
          jiehun: 0,
          gongzuo: [],
          jiaoyu: [],
          peixun: [],
          avatar: ''
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
          this.formData.avatar = res.data.url
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

        if (this.$route.params.id) {
          updateResumeAll(this.formData).then(e => {
            this.$router.push({name: 'resume'})
          }).catch(e => {
            this.$message.error(e);
          })
        } else {
          addResume(this.formData).then(e => {
            this.$router.push({name: 'resume'})
          }).catch(e => {
            this.$message.error(e);
          })
        }
      }
    },
    created() {
      if (this.$route.params.id) {
        queryOneResume({
          id: this.$route.params.id
        }).then(e => {
          this.formData = e;
        })
      }
    }
  }
</script>
