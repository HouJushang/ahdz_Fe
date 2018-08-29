<style lang="sass">
  .position_page
    .position_page_top
      height: 50px
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 22px
</style>
<template>
  <section class="position_page">
    <div class="position_page_top">
      <p>推荐位内容</p>
    </div>
    <el-form :inline="true" :model="filterForm" ref="filterForm" class="demo-form-inline" size="mini">
      <el-form-item label="标题" v-if="this.$route.params.id == 1">
        <el-input v-model="filterForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" v-else>
        <el-input v-model="filterForm.companyName" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="companyName" label="公司"></el-table-column>
      <el-table-column prop="order" label="排序(大到小)">
        <template slot-scope="scope">
          <input :value="scope.row.order" :idValue="scope.row.id" type="number" @change="blurHander"/>
        </template>
      </el-table-column>
      <el-table-column prop="model" label="模型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {queryPositionContent, updatePosition} from '../api/position'
  import {updatePositionContent, delPositionContent} from '../api/positionContent'
  import dateFormat from '../util/dateFormat'
  export default {
    name: 'position_page',
    data () {
      return {
        dateFormat,
        dialogShow: false,
        dialogType: 0,
        formData: {},
        rows: [],
        filterForm: {
          title: '',
          companyName: ''
        },
        filterFormCopy: {},
        filterFormCopyEmpty: {},
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          model: [
            {required: true, message: '请输入模型', trigger: 'blur'},
          ],
        }
      }
    },
    methods :{
      getRows() {
        queryPositionContent(this.$route.params.id, this.filterFormCopy).then(e => {
          this.rows = e;
        })
      },
      showDel(row) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.del(row)
        }).catch(() => {
          console.log('取消删除')
        });
      },
      del(row) {
        delPositionContent({id: row.id}).then(e => {
          this.getRows();
        }).cache(e => {
          this.$message.error(e)
        })
      },
      onSubmit() {
        Object.assign(this.filterFormCopy, this.filterForm)
        this.getRows()
      },
      onClear() {
        Object.assign(this.filterFormCopy, this.filterFormCopyEmpty)
        Object.assign(this.filterForm, this.filterFormCopyEmpty)
        this.getRows()
      },
      blurHander(e){
        const order = parseInt(e.target.value);
        if(!(order >= 0)){
          return false;
        }
        updatePositionContent({
          id: parseInt(e.target.getAttribute('idValue')),
          order: order
        }).then(e => {
          this.$message({
            message: '排序更新成功',
            type: 'success'
          });
        }).catch(e => {
          this.getRows()
        })
      }
    },
    created() {
      Object.assign(this.filterFormCopy, this.filterForm)
      Object.assign(this.filterFormCopyEmpty, this.filterForm)
        this.getRows();
    }
  }
</script>
