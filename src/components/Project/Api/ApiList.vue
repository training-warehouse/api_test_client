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
  </div>
</template>

<script>
import PageType from "@/components/Project/Api/PageType";

export default {
  name: "ApiList",
  props: ['project'],
  methods: {
    onGotoAddApi() {
      this.$emit('pageChanged', PageType.ADD_API)
    },
    onRunApi(api, index) {

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