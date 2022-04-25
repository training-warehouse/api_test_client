<template>
  <div>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="telephone" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="加入时间">
        <template slot-scope="scope">
          {{ scope.row.date_joined|dateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="is_active" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.is_active==true">可用</el-tag>
          <el-tag type="danger" v-if="scope.row.is_active==false">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button :type="scope.row.is_active ? 'danger' : 'success' " size="mini"
                     v-if="!scope.row.is_superuser"
                     @click="changeUserStatus(scope.row,scope.$index)">
            {{ scope.row.is_active ? "禁用" : "启用" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "MemberList",
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.$http.getUsers().then(res => {
      this.users = res.data
    })
  },
  methods: {
    changeUserStatus(user, index) {
      this.$http.changeUserStatus(user.uid, {is_active: !user.is_active}).then(res => {
        Vue.set(this.users, index, res.data)
        this.$message.success()
      })
    }
  }
}
</script>

<style scoped>

</style>