<style lang="sass">
  .roleMenu_page
    .roleMenu_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
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
<template>
  <section class="roleMenu_page">
    <div class="roleMenu_page_top">
      <p>角色菜单管理</p>
    </div>
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="管理员"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)">分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="分配" :visible.sync="dialogVisible" width="50%">
        <el-row>
          <el-col :span="12">
            <h2>已获得</h2>
            <ul class="menuL1">
              <li v-for="item in roleMenu" v-if="item.parentid == 0">
                <p>
                  <span class="index">{{item.id}} </span>
                  {{item.name}}
                  <el-button size="mini" type="text" @click="delMenu(item)">取消</el-button>
                </p>
                <ul class="menuL2">
                  <li v-for="item2 in roleMenu" v-if="item2.parentid == item.id">
                    <p>
                      <span class="index">{{item.id}}-{{item2.id}} </span>
                      {{item2.name}}
                      <el-button size="mini" type="text" @click="delMenu(item2)">取消</el-button>
                    </p>
                    <ul class="menuL3">
                      <li v-for="item3 in roleMenu" v-if="item3.parentid == item2.id">
                        <p>
                          <span class="index">{{item.id}}-{{item2.id}}-{{item3.id}} </span>{{item3.name}}
                          <el-button size="mini" type="text" @click="delMenu(item3)">取消</el-button>
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <h2>待分配</h2>
            <ul class="menuL1">
              <li v-for="item in menuRows" v-if="item.parentid == 0">
                <p>
                  <span class="index">{{item.id}} </span>
                  {{item.name}}
                  <el-button size="mini" type="text" v-if="idArr.indexOf(item.id) == -1" @click="addMenu(item)">增加</el-button>
                </p>
                <ul class="menuL2">
                  <li v-for="item2 in menuRows" v-if="item2.parentid == item.id">
                    <p>
                      <span class="index">{{item.id}}-{{item2.id}} </span>
                      {{item2.name}}
                      <el-button size="mini" type="text"  v-if="idArr.indexOf(item2.id) == -1" @click="addMenu(item2)">增加</el-button>
                    </p>
                    <ul class="menuL3">
                      <li v-for="item3 in menuRows" v-if="item3.parentid == item2.id">
                        <p>
                          <span class="index">{{item.id}}-{{item2.id}}-{{item3.id}} </span>{{item3.name}}
                          <el-button size="mini" type="text"  v-if="idArr.indexOf(item3.id) == -1" @click="addMenu(item3)">增加</el-button>
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </el-col>
        </el-row>
    </el-dialog>
  </section>
</template>

<script>
  import {queryRole} from '../api/role'
  import {queryMenu} from '../api/menu'
  import {queryRoleMenu, delRoleMenu, addRoleMenu,} from '../api/roleMenu'

  export default {
    name: 'roleMenu_page',
    data () {
      return {
        rows: [],
        dialogVisible: false,
        menuRows: [],
        roleMenu: [],
        currentId: '',
        idArr: [],
      }
    },
    methods :{
      getRows() {
        queryRole().then(e => {
          this.rows = e;
        })
      },
      getMenuRows() {
        queryMenu().then(e => {
          this.menuRows = e;
        })
      },
      getRoleMenu(e){
        queryRoleMenu(e).then(result => {
          this.roleMenu = [];
          this.idArr = [];
          result.forEach(e => {
            this.roleMenu.push(e.menu)
            this.idArr.push(e.menu.id)
          })
        })
      },
      showEditForm(row){
        this.dialogVisible = true
        this.currentId = row.id
        this.getRoleMenu(row.id);
      },
      delMenu(item){
        delRoleMenu({
          roleId: this.currentId,
          menuId: item.id,
        }).then(e => {
          this.$message.success('取消成功');
          this.getRoleMenu(this.currentId);
        })
      },
      addMenu(item){
        addRoleMenu({
          roleId: this.currentId,
          menuId: item.id,
        }).then(e => {
          this.$message.success('添加成功');
          this.getRoleMenu(this.currentId);
        })
      }
    },
    created() {
        this.getRows();
        this.getMenuRows();
    }
  }
</script>
