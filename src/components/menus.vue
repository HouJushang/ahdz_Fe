<template>
  <section>
    <el-dialog title="添加" :visible.sync="dialogShow" width="400px">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formData.name" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="父级菜单">
          <el-select v-model.number="formData.parentid" size="mini" :disabled="true">
            <el-option label="顶级栏目" :value="0">
            </el-option>
            <el-option v-for="item in rows" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由">
          <el-input v-model="formData.router" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="formData.listorder" type="number" size="mini"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">{{['添加', '修改'][formType]}}</el-button>
      </el-form>
    </el-dialog>
    <ul class="menuL1">
      <li v-for="item in rows" v-if="item.parentid == 0">
        <p>
          <span class="index">{{item.id}} </span>
          {{item.name}}
          <el-button size="mini" type="text" @click="showEditForm(item)">编辑</el-button>
          <el-button size="mini" type="text" @click="showAddForm(item)">增加子菜单</el-button>
          <el-button size="mini" type="text" @click="showDel(item)">删除</el-button>
        </p>
        <ul class="menuL2">
          <li v-for="item2 in rows" v-if="item2.parentid == item.id">
            <p>
              <span class="index">{{item.id}}-{{item2.id}} </span>
              {{item2.name}}


              <el-button size="mini" type="text" @click="showEditForm(item2)">编辑</el-button>
              <el-button size="mini" type="text" @click="showAddForm(item2)">增加子菜单</el-button>
              <el-button size="mini" type="text" @click="showDel(item2)">删除</el-button>
            </p>
            <ul class="menuL3">
              <li v-for="item3 in rows" v-if="item3.parentid == item2.id">
                <p>
                  <span class="index">{{item.id}}-{{item2.id}}-{{item3.id}} </span>{{item3.name}}
                  <el-button size="mini" type="text" @click="showEditForm(item3)">编辑</el-button>
                  <el-button size="mini" type="text" @click="showDel(item3)">删除</el-button>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

  </section>
</template>
<style lang="sass">
  .index
    color: #ccc
    font-style: italic
    display: inline-block
    text-align: center
  .menuL1
    font-size: 15px
    .index
      width: 20px
    .menuL2
      font-size: 14px
      margin-left: 20px
      .index
        width: 40px
      .menuL3
        font-size: 13px
        margin-left: 40px
        .index
          width: 60px
</style>
<script>
  import {queryMenu, delMenu, addMenu, updateMenu} from '../api/menu'
  export default {
    name: 'menus',
    data() {
      return {
        dialogShow: false,
        rows: [],
        formType: 0, //0 添加 1修改
        formData: {},
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      showAddForm(data) {
        this.formData = {parentid: data.id}
        this.showForm(0)
      },
      showEditForm(data) {
        Object.assign(this.formData, data)
        this.showForm(1)
      },
      showForm(type) {
        this.formType = type
        this.dialogShow = true
        this.$refs['form'] && this.$refs['form'].clearValidate()
      },
      addSubmit() {
        addMenu(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        })
      },
      showDel(data) {
        this.$confirm('此操作将删除该路由, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(data)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(data) {
        delMenu({id: data.id}).then(e => {
          this.getRows()
        })
      },
      getRows() {
        queryMenu().then(e => {
          this.rows = e;
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.formType == 0 ? this.addSubmit() : this.editSubmit();
          }
        });
      },
      addSubmit() {
        addMenu(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
            console.log(e)
        })
      },
      editSubmit() {
        updateMenu(this.formData).then(e => {
          this.dialogShow = false
          this.getRows()
        }).then(e => {
          console.log(e)
        })
      },
    },
    created() {
      this.getRows();
    }
  }
</script>

