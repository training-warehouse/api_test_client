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
      <el-tab-pane label="定时任务" name="5">
        <TaskList :project="project"></TaskList>
      </el-tab-pane>
      <el-tab-pane label="运行记录" name="6">
        <RecordList :project="project"></RecordList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectInfo from "@/components/Project/ProjectInfo";
import HostList from "@/components/Project/HostList";
import ApiEntry from "@/components/Project/Api/ApiEntry";
import CaseEntry from "@/components/Project/Case/CaseEntry";
import RecordList from "@/components/Project/Record/RecordList";
import TaskList from "@/components/Project/TaskList";

export default {
  name: "ProjectDetail",
  components: {
    ProjectInfo,
    HostList,
    ApiEntry,
    CaseEntry,
    RecordList,
    TaskList
  },
  data() {
    return {
      activeName: '1',
      project: {}
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