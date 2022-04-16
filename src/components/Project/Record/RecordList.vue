<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="API" name="1">
        <RecordTable :records="api_records"></RecordTable>
      </el-tab-pane>
      <el-tab-pane label="用例" name="2">
        <el-collapse>
          <el-collapse-item v-for="(record,index) in case_records" :key="index" :title="record.case.name"
                            class="case-record-list">
            <template slot="title">
              <div class="case-record-title">
                <span><b>{{ record.case.name }}</b></span>
                <span> {{ record.case.create_time|dateFormat }}</span>
              </div>
            </template>
            <RecordTable :records="record.api_records"></RecordTable>

          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RecordTable from "@/components/Project/Record/RecordTable";

export default {
  name: "RecordList",
  props: ['project'],
  components: {
    RecordTable
  },
  data() {
    return {
      activeName: "1",
      api_records: [],
      case_records: []
    }
  },
  watch: {
    project(newValue, oldValue) {
      if (this.project && this.project.id) {
        this.$http.getRunRecord(this.project.id, 'api').then(res => {
          this.api_records = res.data
        })
        this.$http.getRunRecord(this.project.id, 'case').then(res => {
          this.case_records = res.data
        })
      }
    }
  }
}
</script>

<style scoped>

</style>