<template>
  <div>
    <div class="top-group">
      <el-button type="primary" icon="el-icon-plus" @click="onGotoAddApi">新增API</el-button>
    </div>
  </div>
</template>

<script>
import PageType from "@/components/Project/Api/PageType";

export default {
  name: "ApiList",
  methods: {
    onGotoAddApi() {
      this.$emit('pageChanged', PageType.ADD_API)
    }
  }
}
</script>

<style scoped lang="scss">
.top-group {
  padding: 10px 0;
}
</style>