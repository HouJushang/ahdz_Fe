<style lang="sass" scoped>
  .mainPage
    .top
      position: absolute
      top: 0px
      left: 0px
      right: 0px
      height: 50px
      background-color: #ccc
      .logo
        float: left
      .topMenu
        float: left
        dd
          float: left
    .left
      position: absolute
      top: 50px
      left: 0px
      width: 200px
      bottom: 0px
    .right
      position: absolute
      right: 0px
      left: 200px
      bottom: 0px
      top: 50px
      padding: 20px
</style>
<template>
  <div class="mainPage">
    <div class="top">
      <div class="logo">
        后台管理
      </div>
      <dl class="topMenu">
        <dd v-for="item in topMenu()">
          {{item.name}}
        </dd>
      </dl>
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

