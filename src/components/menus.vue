<template>
  <table class="menuTable">
    <thead>
    <th>
      <tr>
        <i :class="['open', isShow ? 'el-icon-minus' : 'el-icon-plus']" @click="isShow = !isShow">{{isShow ? '收缩' : '展开'}}</i>
        <span>{{parentItem.name}}</span>
        <!--<span>路由{{parentItem.router}}</span>-->
        <!--<span>排序{{parentItem.listorder}}</span>-->
        <el-button size="mini" type="text" @click="edit(parentItem)">编辑</el-button>
        <el-button size="mini" type="text" @click="add(parentItem)">增加子菜单</el-button>
        <el-button size="mini" type="text" @click="del(parentItem)">删除</el-button>
      </tr>
    </th>
    </thead>
    <tbody v-show="isShow">
    <tr v-for="item in menuArr" v-if="item.parentid == parentItem.id">
      <menuItem :menuArr="menuArr" :parentItem="item"  @add="add" @edit="edit" @del="del"></menuItem>
    </tr>
    </tbody>
  </table>
</template>
<style lang="sass">
  .menuTable
    margin-left: 20px
    th
      font-weight: normal
      span
        margin-left: 14px
    .open
      color: #bb7e42
      cursor: pointer
</style>
<script>
  export default {
    name: 'menuItem',
    props: {
      menuArr: {
        type: Array,
      },
      parentItem: {
        type: Object
      }
    },
    methods: {
      edit(data) {
        this.$emit('edit', data)
      },
      add(data) {
        this.$emit('add', data)
      },
      del(data) {
        this.$emit('del', data)
      }
    },
    data() {
      return {
        rows: [],
        isShow: true
      };
    }
  }
</script>

