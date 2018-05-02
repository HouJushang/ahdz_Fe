<style lang="sass">
  .login_page
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background-color: #333743
    .loagin_wrapper
      box-sizing: border-box
      width: 300px
      padding: 0px 40px
      border-radius: 4px
      background-color: #fff
      color: #525252
      .login_title
        text-align: center
        font-size: 17px
        margin: 20px 0
</style>
<template>
  <section class="login_page">
    <div class="loagin_wrapper">
      <p class="login_title">后台管理登录</p>
      <el-form ref="form" :model="loginForm" class="loginForm" label-width="55px" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-row style="align-items: center">
          <el-col v-html="captcha" :span="12" @click.native="reCaptcha"></el-col>
          <el-col :span="12">
            <el-input size="small" placeholder="验证码" type="text" v-model="loginForm.captcha"></el-input>
          </el-col>
        </el-row>
        <el-button type="primary" :loading="loading" size="small" style="display: block; margin: 20px auto; width: 120px;"
                   @click="submit">登录
        </el-button>
      </el-form>
    </div>
  </section>
</template>
<script>
  import {login} from '../api/login'
  import captcha from '../api/captcha'

  export default {
    name: 'login_page',
    data() {
      return {
        loading: false,
        captcha: '',
        loginForm: {
          username: '',
          password: '',
          captcha: ''
        }
      };
    },
    methods: {
      submit() {
        login(this.loginForm).then(e => {
          localStorage.setItem('username', e.adminResult.username)
          localStorage.setItem('rolename', e.adminRoleResult.role.name)
          localStorage.setItem('currentMenu', 21)
          this.$router.push({name: 'categoryList'})
        }).catch(e => {
          console.log(e)
        })
      },
      getCaptcha() {
        captcha().then(e => {
          console.log(e)
          this.captcha = e.captcha
        }).catch(e => {
          console.log(e)
        })
      },
      reCaptcha() {
        this.getCaptcha()
      }
    },
    mounted() {
      this.getCaptcha()
    }
  }
</script>
