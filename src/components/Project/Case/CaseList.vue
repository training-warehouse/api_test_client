<template>
  <div>
    <div class="top-group">
      <el-button type="primary" icon="el-icon-plus" @click="onAddCase">新增用例</el-button>
    </div>
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