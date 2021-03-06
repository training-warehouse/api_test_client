import axios from "axios";
import auth from "./auth"

const BASE_URL = 'http://127.0.0.1:8000'

class Http {
    constructor() {
        this.http = axios.create({
            baseURL: BASE_URL
        })

        // 设置拦截器，用来添加 JWT Token
        this.http.interceptors.request.use(config => {
            const token = auth.token;
            if (token && token !== 'undefined') {
                console.log("JWT " + token)
                config.headers.common.Authorization = "JWT " + token
            }
            return config
        })

        // 设置拦截器 如果返回403 跳转到登录页面
        this.http.interceptors.response.use(null, err => {
            if (err && err.response && err.response.status === 403) {
                auth.clearUserToken()
            }
            return Promise.reject(err)
        })
    }

    login(params) {
        const url = '/auth/login'
        return this.http.post(url, params)
    }

    addProject(params) {
        const url = '/project'
        return this.http.post(url, params)
    }

    editProject(project_id, params) {
        const url = `/project/${project_id}`
        return this.http.put(url, params)
    }

    deleteProject(project_id) {
        const url = `/project/${project_id}`
        return this.http.delete(url)
    }

    getProjectList() {
        const url = '/project'
        return this.http.get(url)
    }

    getProjectDetial(project_id) {
        const url = `/project/${project_id}`
        return this.http.get(url)
    }

    addHost(params) {
        const url = '/host'
        return this.http.post(url, params)
    }

    editHost(host_id, params) {
        const url = `/host/${host_id}`
        return this.http.put(url, params)
    }

    deleteHost(host_id) {
        const url = `/host/${host_id}`
        return this.http.delete(url)
    }

    addApi(params) {
        const url = '/api'
        return this.http.post(url, params)
    }

    editApi(api_id, params) {
        const url = `/api/${api_id}`
        return this.http.put(url, params)
    }

    deleteApi(api_id) {
        const url = `/api/${api_id}`
        return this.http.delete(url)
    }

    runApi(api_id) {
        const url = `/run/api/${api_id}`
        return this.http.post(url)
    }

    addCase(params) {
        const url = '/case'
        return this.http.post(url, params)
    }

    editCase(case_id, params) {
        const url = `/case/${case_id}`
        return this.http.put(url, params)
    }

    runCase(case_id) {
        const url = `/run/case/${case_id}`
        return this.http.post(url)
    }

    getRunRecord(project_id, type) {
        const url = `/record?project=${project_id}&type=${type}`
        return this.http.get(url)
    }

    editUser(params) {
        const url = '/auth/user'
        return this.http.put(url, params)
    }

    getUsers() {
        const url = '/auth/user'
        return this.http.get(url)
    }

    changeUserStatus(user_id, params) {
        const url = `/auth/user/${user_id}`
        return this.http.patch(url, params)
    }

    getIndexData() {
        const url = '/index'
        return this.http.get(url)
    }

    addTask(params) {
        const url = '/task'
        return this.http.post(url, params)
    }

    editTask(task_id, params) {
        const url = `/task/${task_id}`
        return this.http.put(url, params)
    }

    changeTaskStatus(task_id, status) {
        const url = `/task/${task_id}/${status}`
        return this.http.post(url)
    }
}

export default new Http()
