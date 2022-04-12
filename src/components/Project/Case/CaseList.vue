<template>
  <div>
    <div class="top-group">
      <el-button type="primary" icon="el-icon-plus" @click="onAddCase">新增用例</el-button>
    </div>

    <el-table :data="project.cases" style="width: 100%">
      <el-table-column prop="name" label="日期"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onRunCase(scope.row,scope.$index)">运行</el-button>
          <el-button size="mini" @click="onEditCase(scope.row,scope.$index)">编辑</el-button>
          <el-button type="danger" size="mini" @click="onDeleteCase(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PageType from "@/components/Project/Case/PageType";

export default {
  name: "CaseList",
  props: ['project'],
  methods: {
    onAddCase() {
      this.$emit('pageChanged', PageType.ADD_CASE)
    },
    onRunCase(case_obj, index) {

    },
    onEditCase(case_obj, index) {

    },
    onDeleteCase(case_obj, index) {

    }
  }

}
</script>

<style scoped>
.top-group {
  padding: 10px 0;
  text-align: right;
}
</style>