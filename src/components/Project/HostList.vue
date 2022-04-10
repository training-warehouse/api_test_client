<template>
  <div>
    <div class="top-group">
      <el-button type="primary" icon="el-icon-plus" @click="hostDialogVisible=true">新增Host</el-button>
    </div>

    <el-table :data="project.hosts" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="host" label="Host"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" width=300>
        <template slot-scope="scope">
          <el-button size="mini" @click="onEditHost(scope.row,scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDeleteHost(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增Host" :visible.sync="hostDialogVisible" @close="initProjectForm">
      <el-form ref="hostForm" :model="hostForm" label-width="80px" :rules="hostRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="hostForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="host" prop="host">
          <el-input v-model="hostForm.host" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="hostForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="hostDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="onSubmitAddHost">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "HostList",
  props: ['project'],
  data() {
    return {
      hostDialogVisible: false,
      hostForm: {
        name: '',
        host: '',
        description: ''
      },
      hostRules: {
        name: [{required: true, target: 'blur', message: '请输入Host名称'}],
        host: [{required: true, target: 'blur', message: '请输入Host地址'}]
      },
      dialogType: 'add',
      editIndex: 0,
    }
  },
  methods: {
    initProjectForm() {
      this.hostDialogVisible = false
      this.dialogType = 'add'
      this.editIndex = 0
      this.hostForm = {
        name: '',
        host: '',
        description: ''
      }
    },

    onSubmitAddHost() {
      this.$refs['hostForm'].validate(valid => {
        if (!valid) return;
        const params = JSON.parse(JSON.stringify(this.hostForm))
        params.project_id = this.project.id
        this.$loading.show()
        const editIndex = this.editIndex

        if (this.dialogType === 'add') {
          this.$http.addHost(params).then(res => {
            const host = res.data
            let hosts = this.project.hosts
            hosts.push(host)
          })
        } else {
          this.$http.editHost(this.hostForm.id, params).then(res => {
            const host = res.data
            Vue.set(this.project.hosts, editIndex, host)
          })
        }
        this.initProjectForm()
        this.$loading.hide()
        this.$message.success()
      })
    },
    onEditHost(host, index) {
      this.hostForm = JSON.parse(JSON.stringify(host))
      this.hostDialogVisible = true
      this.editIndex = index
      this.dialogType = 'edit'
      console.log(this.editIndex)
    },

    onDeleteHost(host, index) {
      this.$messageBox.confrim({
        message: '您确认要删除这个Host吗？',
        confrimCallback: () => {
          this.$loading.show()
          this.$http.deleteHost(host.id).then(() => {
            let hosts = this.project.hosts
            hosts.splice(index, 1)
            this.$loading.hide()
            this.$message.success()
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
  text-align: right;
}

.dialog-footer {
  text-align: right;
}
</style>