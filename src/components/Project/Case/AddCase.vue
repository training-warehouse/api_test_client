<template>
  <div>
    <div class="top-group">
      <el-link type="default" icon="el-icon-back" :underline="false" @click="onGotoCaseList">用例列表</el-link>
      <el-button-group>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button type="default" @click="onCancel">取消</el-button>
      </el-button-group>
    </div>

    <el-form ref="form" :model="form" label-width="80px" :rules="rules" :inline="true" class="form-group">
      <div class="case-name-group" style="width: 400px">
        <el-form-item label="用例名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>

      <!--用例参数-->
      <div class="case-argument-group">
        <el-form-item label="用例参数">
          <div v-for="(argument,index) in form.arguments" :key="index" class="case-argument-input-group">
            <el-input v-model="argument.name" placeholder="请输入参数名称"></el-input>
            <el-input v-model="argument.value" placeholder="请输入参数值"></el-input>
            <span class="button-group">
              <el-button type="info" v-if="form.arguments.length>1" icon="el-icon-delete" size="mini"
                         @click="onRemoveCaseArgument(argument,index)"></el-button>
              <el-button type="default" icon="el-icon-plus" size="mini"
                         @click="onAddCaseArgument(argument,index)"></el-button>
            </span>
          </div>
        </el-form-item>
      </div>

      <!--用例列表-->
      <el-timeline>
        <el-timeline-item v-for="(case_api,index) in form.apis" :key="index" color="#0bbd87">
          <el-form-item :label="`第${index+1}步`">
            <el-select v-model="case_api.id" placeholder="请选择要执行的api">
              <el-option
                  v-for="api in project.apis"
                  :key="api.name+index"
                  :label="`${api.name}(${api.path})`"
                  :value="api.id">
              </el-option>
            </el-select>
            <span class="button-group">
              <el-button type="danger" v-if="form.apis.length>1" icon="el-icon-delete" size="mini"
                         @click="onRemoveApi(case_api,index)"></el-button>
              <el-button type="primary" icon="el-icon-plus" size="mini"
                         @click="onAddApi(case_api,index)"></el-button>
            </span>
          </el-form-item>
          <el-form-item label="提取参数">
            <div v-for="(argument,index) in case_api.arguments" :key="index" class="argument-group">
              <el-input v-model="argument.name" placeholder="请输入参数名" class="argument-input"></el-input>
              <el-select v-model="argument.origin" placeholder="请选择参数来源" class="argument-input">
                <el-option label="响应体" value="BODY"></el-option>
                <el-option label="响应头" value="HEADER"></el-option>
                <el-option label="响应Cookie" value="COOKIE"></el-option>
              </el-select>

              <el-input v-model="argument.format" placeholder="请输入参数获取格式" class="argument-input"></el-input>

              <span class="button-group">
                <el-button type="info" v-if="case_api.arguments.length>1" icon="el-icon-delete" size="mini"
                           @click="onRemoveApiArgument(case_api,argument,index)"></el-button>
                <el-button type="default" icon="el-icon-plus" size="mini"
                           @click="onAddApiArgument(case_api)"></el-button>
              </span>
            </div>
          </el-form-item>
        </el-timeline-item>
      </el-timeline>

      <el-form-item label="用例描述">
        <el-input v-model="form.description" type="textarea" :rows="5" :cols="40" placeholder="请输入描述信息"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import PageType from "@/components/Project/Case/PageType";

export default {
  name: "AddCase",
  props: ['project', 'case_obj'],
  data() {
    return {
      form: {
        name: '',
        description: '',
        arguments: [{name: '', value: ''}],
        apis: [{
          id: '',
          index: 0,
          arguments: [{name: '', origin: '', format: ''}]
        }]
      },
      rules: {
        name: [{required: true, trigger: 'blur', message: '请输入用例名称'}]
      }
    }
  },
  mounted() {
    if (this.case_obj) {
      let form = JSON.parse(JSON.stringify(this.case_obj))

      if (form.arguments.length === 0) {
        form.arguments = [{name: '', value: ''}]
      }

      if (form.apis.length === 0) {
        this.form.apis = [{
          id: '',
          index: 0,
          arguments: [{name: '', origin: '', format: ''}]
        }]
      } else {
        for (let api of form.apis) {
          if (api.arguments.length === 0) {
            api.arguments = [{name: '', origin: '', format: ''}]
          }
        }
      }
      this.form = form

    }
  },
  methods: {
    onGotoCaseList() {
      this.$emit('pageChanged', PageType.CASE_LIST)
    },
    onSave() {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        let params = JSON.parse(JSON.stringify(this.form))

        let args = []
        for (let argument of params.arguments) {
          if (argument.name && argument.value) {
            args.push(argument)
          }
        }
        params.arguments = args

        let apis = []
        let index = 0
        for (let api of params.apis) {
          if (api.id) {
            let api_args = []
            for (let argument of api.arguments) {
              if (argument.name && argument.origin && argument.format) {
                api_args.push(argument)
              }
            }
            api.arguments = api_args
            api.index = index
            apis.push(api)

            index++
          }
        }
        params.apis = apis
        params.project_id = this.project.id

        this.$loading.show()
        let that = this
        if (this.form.id) {
          this.$http.editCase(this.form.id, params).then(res => {
            this.$loading.hide()
            const case_model = res.data

            let index = 0
            for (let tmp_case of that.project.cases) {
              if (tmp_case.id === case_model.id) {
                that.project.cases[index] = case_model
                break
              }
              index++
            }
            this.$emit('pageChanged', PageType.CASE_LIST)
            this.$message.success()
          })
        } else {
          this.$http.addCase(params).then(res => {
            this.$loading.hide()
            const case_model = res.data
            that.project.cases.push(case_model)
            this.$emit('pageChanged', PageType.CASE_LIST)
            this.$message.success()
          })
        }
      })
    },
    onCancel() {
      this.$emit('pageChanged', PageType.CASE_LIST)
    },
    onRemoveCaseArgument(argument, index) {
      this.form.arguments.splice(index, 1)
    },
    onAddCaseArgument(argument, index) {
      this.form.arguments.push({name: "", value: ""})
    },
    onRemoveApi(case_api, index) {
      this.form.apis.splice(index, 1)
    },
    onAddApi(case_api, index) {
      this.form.apis.push({
        id: '',
        index: 0,
        arguments: [{name: '', origin: '', format: ''}]
      })
    },
    onRemoveApiArgument(case_api, argument, index) {
      case_api.arguments.splice(index, 1)
    },
    onAddApiArgument(case_api) {
      case_api.arguments.push({name: '', origin: '', format: ''})
    }
  }
}
</script>

<style scoped lang="scss">
.form-group {
  background: #fff;
  padding: 26px;
}

.top-group {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.button-group {
  margin-left: 10px;
}

.case-argument-group {
  .case-argument-input-group {
    width: 500px;
    display: flex;
    justify-content: space-around;

    div {
      width: 160px;
    }
  }
}

.argument-group {
  display: flex;
  width: 600px;
  justify-content: space-around;

  .argument-input {
    width: 160px;
  }
}
</style>