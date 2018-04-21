<style lang="sass" scoped>
  .mainPage
    .top
      position: absolute
      top: 0px
      left: 0px
      right: 0px
      height: 40px
      background-color: #373d41
      color: #fff
      display: flex
      .logo
        box-sizing: border-box
        width: 180px
        display: flex
        align-items: center
        justify-content: center
        font-size: 18px
        border-right: 1px solid #2a2f32
      .topRight
        flex: 1
        display: flex
        .topMenu
          flex: 1
          display: flex
          align-items: flex-end
          height: 100%
          dd
            box-sizing: border-box
            border-bottom: none
            width: 85px
            height: 32px
            color: #fff
            line-height: 32px
            text-align: center
            margin-left: 20px
            cursor: pointer
            &.active
              border: 1px solid #2a2f32
              background-color: #474f54
        .personal
          width: 120px
    .left
      position: absolute
      top: 40px
      left: 0px
      width: 180px
      bottom: 0px
      background-color: #333743
      .menuLeft
        background-color: #42475a
        color: #fff
      .menuChildWrap
        background-color: #333743
        li
          padding-left: 28px
          line-height: 28px
          &:hover
            background-color: #4a4e62
          .menuLink
            display: inline-block
            width: 100%
            height: 100%
            color: #fff
      .leftMenuP
        font-size: 13px
        line-height: 32px
        padding-left: 10px

    .right
      position: absolute
      right: 0px
      left: 180px
      bottom: 0px
      top: 40px
      padding: 20px
      background-color: #eaedf1
      padding: 10px
      & > section
        background-color: #fff
        padding: 10px
</style>
<template>
  <div class="mainPage">
    <div class="top">
      <div class="logo">
        后台管理
      </div>
      <div class="topRight">
        <dl class="topMenu">
          <dd v-for="item in menuData" v-if="item.parentid == 0" @click="choseMenu(item.id)" :class="[item.id == currentMenu ? 'active' : '']">
            {{item.name}}
          </dd>
        </dl>
        <div class="personal" @click="loginOutFn">
          退出
        </div>
      </div>
    </div>
    <div class="left">
      <dl class="menuLeft">
        <dd v-for="item in menuData" v-if="item.parentid == currentMenu">
          <div class="leftMenuP"><i class="el-icon-caret-right"></i> {{item.name}}</div>
          <ul class="menuChildWrap">
            <li v-for="item2 in menuData" v-if="item2.parentid == item.id">
              <router-link :to="{name: item2.router}" class="menuLink">{{item2.name}}</router-link>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import {getApi} from '../api/api'
  import {loginOut} from '../api/login'
  export default {
    name: 'mainPage',
    data () {
      return {
        menuData: [],
        currentMenu: 0,
      }
    },
    methods: {
      choseMenu (id) {
        this.currentMenu = id
      },
      loginOutFn() {
        loginOut().then(() => {
          this.$router.push({name: 'login'})
        }).catch(e => {
          this.$message.error(e);
        })
      }
    },
    created() {
      getApi('admin/menu').then(e => {
        this.menuData = e;
      })
    }
  }
</script>

