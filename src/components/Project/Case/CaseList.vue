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

    <el-dialog title="运行结果" :visible.sync="dialogVisible" width="90%">
      <el-table :data="records" height="500">
        <el-table-column prop="url" label="url" width="150" fixed></el-table-column>
        <el-table-column prop="http_method" label="请求方法" width="100"></el-table-column>
        <el-table-column prop="headers" label="请求头"></el-table-column>
        <el-table-column prop="data" label="请求体"></el-table-column>
        <el-table-column prop="return_code" label="状态码" width="80"></el-table-column>
        <el-table-column prop="return_content" label="响应体" width="800"></el-table-column>
        <el-table-column prop="run_result" label="测试结构" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.run_result===true">成功</el-tag>
            <el-tag type="success" v-if="scope.row.run_result===false">失败</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PageType from "@/components/Project/Case/PageType";

export default {
  name: "CaseList",
  props: ['project'],
  data() {
    return {
      dialogVisible: false,
      records: []
    }
  },
  methods: {
    onAddCase() {
      this.$emit('pageChanged', PageType.ADD_CASE)
    },
    onRunCase(case_obj, index) {
      this.$loading.show()
      this.$http.runCase(case_obj.id).then(res => {
        this.$loading.hide()
        const case_record = res.data
        let records = case_record.api_records
        for (let record of records) {
          if (record.return_code === record.api.expect_code) {
            record.run_result = true
          } else {
            record.run_result = false
          }
        }

        this.records = records
        this.dialogVisible = true
      })
    },
    onEditCase(case_obj, index) {
      this.$emit('pageChanged', PageType.ADD_CASE, case_obj)
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