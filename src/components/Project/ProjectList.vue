<template>
  <div>
    <h1>项目列表</h1>
    <div class='top-group'>
      <el-button type="primary" icon="el-icon-plus" @click="onAddProject">新增项目</el-button>
    </div>
    <el-table :data="projects" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="180">
        <template slot-scope="scope">
          <router-link :to="'/project/'+scope.row.id">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.last_update_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template>
          <el-tag type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEditProject(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDeleteProject(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增项目" :visible.sync="addDialogVisiable" @close="initProjectForm">
      <el-form ref="projectForm" :model="projectForm" label-width="80px" :rules="projectRules">
        <el-form-item label="名字" prop="name">
          <el-input v-model="projectForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="projectForm.type" placeholder="请选择类型">
            <el-option label="Web" value="web"></el-option>
            <el-option label="App" value="app"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="projectForm.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="initProjectForm">取消</el-button>
        <el-button type="primary" @click="onSubmitAddProject" :loading="addProjectButtonLoading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "ProjectList",
  data() {
    return {
      addDialogVisiable: false,
      projects: [],
      projectForm: {
        id: '',
        name: '',
        type: '',
        description: ''
      },
      projectRules: {
        name: [
          {required: true, message: '请输入项目名', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择项目类型', trigger: 'blur'}
        ]
      },
      addProjectButtonLoading: false,
      dialogType: 'add'
    }
  },
  mounted() {
    this.$http.getProjectList().then(res => {
      this.projects = res.data
    })
  },
  methods: {
    onAddProject() {
      this.addDialogVisiable = true
      this.dialogType = 'add'
    },
    initProjectForm() {
      this.projectForm = {
        id: '',
        name: '',
        type: '',
        description: ''
      }
      this.addDialogVisiable = false
      this.dialogType = 'add'
    },
    onEditProject(project) {
      this.projectForm = {
        id: project.id,
        name: project.name,
        type: project.type,
        description: project.description,
      }
      this.addDialogVisiable = true
      this.dialogType = 'edit'
    },
    onDeleteProject(project, index) {
      this.$messageBox.confrim({
        message: "您确定要删除这个项目吗？",
        confrimCallback: () => {
          this.$http.deleteProject(project.id)
          this.projects.splice(index, 1)
          this.$message.success()
        }
      })
    },
    onSubmitAddProject() {
      this.$refs['projectForm'].validate(valid => {
        if (!valid) return;
        this.addProjectButtonLoading = true
        if (this.dialogType === 'add') {
          this.$http.addProject(this.projectForm).then(res => {
            if (res && res.status === 201) {
              const project = res.data
              this.projects.push(project)
              this.initProjectForm()
              this.$message.success('项目创建成功！')
            }
          })
        } else {
          this.$http.editProject(this.projectForm.id, this.projectForm).then(res => {
            if (res) {
              const project = res.data
              let index = 0
              for (let old_project of this.projects) {
                if (old_project.id === project.id) {
                  Vue.set(this.projects, index, project)
                  break
                }
                index++
              }
              this.initProjectForm()
              this.$message.success('项目编辑成功！')
            }
          })
        }
        this.addProjectButtonLoading = false
      })
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