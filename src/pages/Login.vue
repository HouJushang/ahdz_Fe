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
      height: 220px
      padding: 0 40px
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
        <el-button type="primary" :loading="loading" size="small" style="display: block; margin: 0 auto; width: 120px;" @click="submit">登录</el-button>
      </el-form>
    </div>
  </section>
</template>
<script>
  import {login} from '../api/login'
  export default {
    name: 'login_page',
    data() {
      return {
        loading: false,
        loginForm: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      submit() {
        login(this.loginForm).then(e => {
          this.$router.push({name: 'main'})
        }).catch(e => {
            console.log(e)
        })
      }
    },
  }
</script>
