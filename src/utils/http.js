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
}

export default new Http()
