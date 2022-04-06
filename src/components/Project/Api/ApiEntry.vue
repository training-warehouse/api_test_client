<template>
  <div>
    <ApiList v-if="page === PageType.API_LIST" :project="project" @pageChanged="onPageChanged"></ApiList>
    <AddApi v-if="page === PageType.ADD_API" :project="project" @pageChanged="onPageChanged"></AddApi>
  </div>
</template>

<script>
import ApiList from "@/components/Project/Api/ApiList";
import AddApi from "@/components/Project/Api/AddApi";
import PageType from "@/components/Project/Api/PageType";

export default {
  name: "ApiEntry",
  props: ['project'],
  components: {
    ApiList,
    AddApi
  },
  data() {
    return {
      page: PageType.API_LIST,
      PageType
    }
  },
  methods: {
    onPageChanged(page) {
      this.page = page
    }
  }
}
</script>

<style scoped>

</style>