<template>
  <div>
    <CaseList v-if="page === PageType.CASE_LIST" :project="project" @pageChanged="onPageChanged"></CaseList>
    <AddCase v-if="page === PageType.ADD_CASE" :case_obj="case_obj" :project="project"
             @pageChanged="onPageChanged"></AddCase>
  </div>
</template>

<script>
import AddCase from "@/components/Project/Case/AddCase";
import CaseList from "@/components/Project/Case/CaseList";
import PageType from "@/components/Project/Case/PageType";

export default {
  name: "CaseEntity",
  props: ['project'],
  data() {
    return {
      PageType,
      page: PageType.CASE_LIST,
      case_obj: null
    }
  },
  components: {
    AddCase,
    CaseList
  },
  methods: {
    onPageChanged(page, case_obj) {
      this.page = page
      this.case_obj = case_obj
    }
  }
}
</script>

<style scoped>

</style>