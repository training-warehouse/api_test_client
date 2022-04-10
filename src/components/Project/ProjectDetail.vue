<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="项目介绍" name="1">
        <ProjectInfo :project="project"></ProjectInfo>
      </el-tab-pane>
      <el-tab-pane label="项目Host" name="2">
        <HostList :project="project"></HostList>
      </el-tab-pane>
      <el-tab-pane label="API接口" name="3">
        <ApiEntry :project="project"></ApiEntry>
      </el-tab-pane>
      <el-tab-pane label="测试用例" name="4">
        <CaseEntry :project="project"></CaseEntry>
      </el-tab-pane>
      <el-tab-pane label="运行记录" name="5">
        运行记录
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectInfo from "@/components/Project/ProjectInfo";
import HostList from "@/components/Project/HostList";
import ApiEntry from "@/components/Project/Api/ApiEntry";
import CaseEntry from "@/components/Project/Case/CaseEntry";

export default {
  name: "ProjectDetail",
  components: {
    ProjectInfo,
    HostList,
    ApiEntry,
    CaseEntry
  },
  data() {
    return {
      activeName: '1',
      project:{}
    }
  },
  mounted() {
    const project_id = this.$route.params.project_id
    this.$http.getProjectDetial(project_id).then(res => {
      this.project = res.data
    })
  }
}
</script>

<style scoped>

</style>