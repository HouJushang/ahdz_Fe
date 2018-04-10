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
            border: 1px solid #2a2f32
            box-sizing: border-box
            border-bottom: none
            width: 85px
            height: 32px
            color: #fff
            line-height: 32px
            text-align: center
            margin-left: 20px
            background-color: #474f54
            cursor: pointer
        .personal
          width: 120px
    .left
      position: absolute
      top: 40px
      left: 0px
      width: 180px
      bottom: 0px
      background-color: #333743
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
</style>
<template>
  <div class="mainPage">
    <div class="top">
      <div class="logo">
        后台管理
      </div>
      <div class="topRight">
        <dl class="topMenu">
          <dd v-for="item in topMenu()">
            {{item.name}}
          </dd>
        </dl>
        <div class="personal">
          用户名
        </div>
      </div>
    </div>
    <div class="left">
      left
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import {getApi} from '../api/api'
  export default {
    name: 'mainPage',
    data () {
      return {
        menuData: []
      }
    },
    methods: {
      topMenu() {
          return this.menuData.filter(e => {
              return e.parentid == 0;
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

