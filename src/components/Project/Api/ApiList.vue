<template>
  <div>
    <div class="top-group">
      <el-button type="primary" icon="el-icon-plus" @click="onGotoAddApi">新增API</el-button>
    </div>

    <el-table :data="project.apis" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="Host">
        <template slot-scope="scope">
          {{ scope.row.host.host }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onRunApi(scope.row,scope.$index)">运行</el-button>
          <el-button size="mini" @click="onEditApi(scope.row,scope.$index)">编辑</el-button>
          <el-button type="danger" size="mini" @click="onDeleteApi(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="运行结果" :visible.sync="dialogVisible" width="80%">
      <el-table :data="[record]" height="250">
        <el-table-column prop="url" label="url" width="150" fixed></el-table-column>
        <el-table-column prop="http_method" label="请求方法" width="100"></el-table-column>
        <el-table-column prop="headers" label="请求头"></el-table-column>
        <el-table-column prop="data" label="请求体"></el-table-column>
        <el-table-column prop="return_code" label="状态码"></el-table-column>
        <el-table-column prop="return_content" label="响应体" width="500"></el-table-column>
        <el-table-column prop="return_result" label="测试结果">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.run_result===true">成功</el-tag>
            <el-tag type="danger" v-if="scope.row.run_result===false">失败</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PageType from "@/components/Project/Api/PageType";

export default {
  name: "ApiList",
  props: ['project'],
  data() {
    return {
      dialogVisible: false,
      record: {}
    }
  },
  methods: {
    onGotoAddApi() {
      this.$emit('pageChanged', PageType.ADD_API)
    },
    onRunApi(api, index) {
      this.$loading.show()
      this.$http.runApi(api.id).then(res => {
        this.$loading.hide()
        const record = res.data
        if (record.return_code === record.api.expect_code) {
          record.run_result = true
        } else {
          record.run_result = false
        }
        this.record = record
        this.dialogVisible = true
      })
    },
    onEditApi(api, index) {
      this.$emit('pageChanged', PageType.ADD_API, api)
    },
    onDeleteApi(api, index) {
      let that = this
      this.$messageBox.confrim({
        confrimCallback: () => {
          this.$loading.show();
          this.$http.deleteApi(api.id).then(res => {
            this.$loading.hide()
            this.$message.success()
            that.project.apis.splice(index, 1)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.top-group {
  padding: 10px 0;
}
</style>