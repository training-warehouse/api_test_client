<template>
  <div>
    <div class="top-group">
      <el-link type="default" icon="el-icon-back" :underline="false" @click="onGotoApiList">接口列表</el-link>
      <el-button-group>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button type="default" @click="onGotoApiList">取消</el-button>
      </el-button-group>
    </div>

    <div class="main-group">
      <el-form ref="form" :model="form" :inline="true" label-width="80px" :rules="rules">
        <el-collapse v-model="activeNames" class="collapse-group">
          <el-collapse-item title="接口" name="1">
            <el-form-item label="接口名" prop="name">
              <el-input v-model="form.name" placeholder="请输入接口名称"></el-input>
            </el-form-item>
            <el-form-item label="请求方法" prop="http_method">
              <el-select v-model="form.http_method" placeholder="请选择请求方法">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
                <el-option label="DELETE" value="DELETE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="域名" prop="host">
              <el-select v-model="form.host" placeholder="请选择域名">
                <template v-if="project && project.host_list">
                  <el-option v-for="host in project.host_list" :label="host.name" :value="host.id"
                             :key="host.id"/>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="Path" prop="path">
              <el-input v-model="form.path" placeholder="请输入url的path"></el-input>
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item title="请求头部" name="2">
            <el-table :data="form.headers" style="width:100%">
              <el-table-column prop="name" label="key" width="200">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.name" placeholder="Header类型" :filterable="true">
                    <el-option v-for="item in headers" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="value" width="600">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.value" placeholder="请输入内容" :value="scope.row.value"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="onDeleteHeader(scope.$index)"
                             v-if="form.headers.length>1"></el-button>
                  <el-button type="primary" icon="el-icon-plus" size="mini" @click='OnAddHeader'
                             v-if="scope.$index===form.headers.length-1"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>

          <el-collapse-item title="请求参数" name="3">
            <el-table :data="form.data" style="width:100%">
              <el-table-column prop="name" label="参数名" width="200">
                <template slot-scope="scope">
                  <el-input v-model.trim="scope.row.name" :value="scope.row.name" placeholder="请输入参数名"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="参数值" width="800">
                <template slot-scope="scope">
                  <el-input v-model.trim="scope.row.value" :value="scope.row.value" placeholder="请输入参数值"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="onDeleteBody(scope.$index)"
                             v-if="form.data.length>1"></el-button>
                  <el-button type="primary" icon="el-icon-plus" size="mini" @click='OnAddBody'
                             v-if="scope.$index===form.data.length-1"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>

          <el-collapse-item title="期望结果" name="4">
            <el-form-item label="状态码" prop="expect_code">
              <el-select v-model="form.expect_code" placeholder="请选择状态码">
                <el-option v-for="item in status_codes" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期望内容" prop="expect_content">
              <el-input v-model="form.expect_content" placeholder="请输入期望内容" type="textarea" rows="5"
                        cols="50"></el-input>
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item title="描述" name="5">
            <el-input v-model="form.description" placeholder="请输入描述信息" class="desc-input" type="textarea"
                      rows="5"></el-input>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script>
import PageType from "@/components/Project/Api/PageType";

export default {
  name: "AddApi",
  props: ['project'],
  data() {
    return {
      form: {
        name: '',
        http_method: '',
        host: '',
        path: '',
        headers: [{'name': '', value: ''}],
        data: [{name: '', value: ''}],
        description: '',
        expect_code: '',
        expect_content: '',
      },
      rules: {
        name: [{required: true, trigger: 'blur', message: '请输入接口名称'}],
        host: [{required: true, trigger: 'blur', message: '请选择host'}],
        http_method: [{required: true, trigger: 'blur', message: '请选择请求方法'}],
        path: [{required: true, trigger: 'blur', message: '请输入Path'}],
        expect_code: [{required: true, trigger: 'blur', message: '请选择状态码'}],
      },
      activeNames: ['1', '2', '3', '4', '5'],
      headers: ['Accept',
        'Accept-Charset',
        'Accept-Encoding',
        'Accept-Language',
        'Accept-Ranges',
        'Authorization',
        'Cache-Control',
        'Connection',
        'Cookie',
        'Content-Length',
        'Content-Type',
        'Content-MD5',
        'Date',
        'Expect',
        'From',
        'Host',
        'If-Match',
        'If-Modified-Since',
        'If-None-Match',
        'If-Range',
        'If-Unmodified-Since',
        'Max-Forwards',
        'Origin',
        'Pragma',
        'Proxy-Authorization',
        'Range',
        'Referer',
        'TE',
        'Upgrade',
        'User-Agent',
        'Via'
      ],
      status_codes: ['200', '201', '202', '203', '204', '301', '302', '400', '401', '403', '404', '405', '406', '407', '408', '500', '502']
    }
  },
  methods: {
    onGotoApiList() {
      this.$emit('pageChanged', PageType.API_LIST)
    },
    onSave() {

    },
    onDeleteHeader(index) {
      this.form.headers.splice(index, 1)
    },
    OnAddHeader() {
      this.form.headers.push({'name': '', value: ''})
    },
    onDeleteBody(index) {
      this.form.data.splice(index, 1)
    },
    OnAddBody() {
      this.form.data.push({'name': '', value: ''})
    }

  }
}
</script>

<style scoped lang="scss">
.top-group {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
}
</style>

<style scoped>
.collapse-group >>> .el-collapse-item {
  padding: 0 20px;
  background: #fff;
}
</style>