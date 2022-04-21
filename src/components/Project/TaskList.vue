<template>
  <div>
    <h1>定时任务列表</h1>
    <div class='top-group'>
      <el-button type="primary" icon="el-icon-plus" @click="onAddTask">新增定时任务</el-button>
    </div>

    <el-table :data="project.tasks" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="case.name" label="用例"></el-table-column>
      <el-table-column prop="expr" label="表达式"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1?'success':'info'">
            {{ scope.row.status === 1 ? '正在运行' : '停止运行' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEditProject(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="onChangeStatus(scope.row)">
            <template v-if="scope.row.status === 1">停止</template>
            <template v-if="scope.row.status === 2">开启</template>
          </el-button>
          <el-button size="mini" type="danger" @click="onDeleteProject(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增任务" :visible.sync="dialogVisible" @close="dialogVisible=false">
      <el-form ref="taskForm" :model="taskForm" label-width="80px" :rules="taskRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="taskForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用例" prop="case_id">
          <el-select v-model="taskForm.case_id" placeholder="请选择测试用例">
            <el-option v-for="case_obj in project.cases" :label="case_obj.name"
                       :value="case_obj.id" :key="case_obj.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表达式" prop="expr">
          <el-input v-model="taskForm.expr" autocomplete="off"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="onSubmitTask">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: ['project'],
  data() {
    return {
      dialogVisible: false,
      taskForm: {
        name: '',
        case_id: '',
        expr: ''
      },
      taskRules: {
        name: [{required: true, trigger: 'blur', message: '请输入接口名称'}],
        case_id: [{required: true, trigger: 'change', message: '请选择测试用例'}],
        expr: [{required: true, trigger: 'blur', message: '请输入表达式'}],
      },
    }
  },
  methods: {
    onAddTask() {
      this.dialogVisible = true
    },
    initForm() {
      this.dialogVisible = false
      this.taskForm = {
        name: '',
        case_id: '',
        expr: ''
      }
    },
    onSubmitTask() {
      this.$refs['taskForm'].validate(valid => {
        if (!valid) return
        const params = JSON.parse(JSON.stringify(this.taskForm))
        params.project_id = this.project.id

        let that = this
        this.$http.addTask(params).then(res => {
          const task = res.data
          that.project.tasks.push(task)
          that.initForm()
          that.$message.success()
        })
      })
    },
    onChangeStatus(task) {

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