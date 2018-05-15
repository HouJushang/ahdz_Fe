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
    <el-table :data="rows" border style="width: 100%" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="order" label="排序(大到小)">
        <template slot-scope="scope">
          <input :value="scope.row.order" :idValue="scope.row.id" type="number" @blur="blurHander"/>
        </template>
      </el-table-column>
      <el-table-column prop="model" label="模型"></el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {queryPositionContent, updatePosition} from '../api/position'
  import {updatePositionContent} from '../api/positionContent'
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
        queryPositionContent(this.$route.params.id).then(e => {
          this.rows = e;
        })
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
        this.getRows();
    }
  }
</script>
