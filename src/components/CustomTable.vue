<template>
  <el-table :data="data" style="width: 100%" border fit default-expand-all>
    <!-- 多选框checkbox -->
    <el-table-column v-if="showSelection" type="selection" width="55">
    </el-table-column>
    <el-table-column v-for="(item,index) in tableHead" :key="index" :width="item.width ? item.width : ''"
                     :align="item.align||'center'" :label="item.label" :prop="item.prop" show-overflow-tooltip>
      <template v-slot="scope">
        <!-- 单元格渲染html代码 -->
        <template v-if="item.render"><span v-html="item.render(scope.row)"></span></template>
        <!-- 渲染普通文字 -->
        <template v-else>{{scope.row[item.prop]}}</template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomeTable',
  props: {
    //显示多选框
    showSelection: {
      type: Boolean,
      default: true,
    },
    //表格数据
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    //表头数据
    tableHead: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup(props) {},
})
</script>
