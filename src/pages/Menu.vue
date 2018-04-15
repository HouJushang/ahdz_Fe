<style lang="sass">
  .menu_page
    .munuMan
      display: flex
      justify-content: space-between
      p
        font-size: 22px
</style>
<template>
  <section class="menu_page">
    <div class="munuMan">
      <p>菜单管理</p>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addTopMenu">添加顶级菜单</el-button>
    </div>
    <menus ref="menus"></menus>
  </section>
</template>
<script>
  import {queryMenu, delMenu, addMenu, updateMenu} from '../api/menu'
  import menus from '../components/menus.vue'
  export default {
    name: 'menuPage',
    data () {
      return {
        rows: [],
      }
    },
    methods: {
      addTopMenu() {
        this.$refs.menus.showAddForm({id: 0})
      }
    },
    created() {
    },
    components: {
      menus,
    }
  }
</script>
<style scoped>
</style>
