<template>
  <div class="menu">
    <el-dialog title="添加" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item  label="菜单名称">
          <el-input v-model="formData.name" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="父级菜单">
          <el-select  v-model="formData.parentid" size="mini">
            <el-option label="顶级栏目" value="0">
            </el-option>
            <el-option v-for="item in rows" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item  label="路由">
          <el-input v-model="formData.router" size="mini"></el-input>
        </el-form-item>

        <el-form-item  label="排序">
          <el-input v-model="formData.listorder" type="number" size="mini"></el-input>
        </el-form-item>

      </el-form>
      <el-button type="primary" v-if="formType == 'add'" @click="addSubmit">添加</el-button>
      <el-button type="primary" v-if="formType == 'edit'" @click="editSubmit">修改</el-button>
    </el-dialog>
    <menu-item :menuArr="rows" :parentItem="{name: '顶级栏目', id: '0'}"  @add="showAddForm" @edit="showEditForm" @del="showDel" style="margin-left: -10px;"></menu-item>
  </div>
</template>
<script>
  import {queryMenu, delMenu, addMenu, updateMenu} from '../api/menu'
  import menuItem from '../components/menus.vue'
  export default {
    name: 'menuPage',
    data () {
      return {
        rows: [],
        dialogShow: false,
        formType: '',
        formData: {
        }
      }
    },
    methods: {
      showAddForm(data) {
        this.formData = {parentid: data.id}
        this.showForm('add')
      },
      showEditForm(data) {
        Object.assign(this.formData , data)
        this.showForm('edit')
      },
      showForm(type) {
        this.formType = type
        this.dialogShow = true
      },
      addSubmit() {
        addMenu(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        })
      },
      editSubmit() {
      },
      showDel(data) {
        alert(2)
        this.$confirm('此操作将删除该路由, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delMenu({id: data.id}).then(e=>{
           this.getRows()
        })
      },
      getRows() {
        queryMenu().then(e => {
          this.rows = e;
        })
      }
    },
    created() {
      this.getRows()
    },
    components: {
      menuItem,
    }
  }
</script>
<style scoped>
</style>
