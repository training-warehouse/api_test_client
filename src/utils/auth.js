const USER_KEY = 'USER_KEY'
const TOKEN_KEY = 'JWT_TOKEN_KEY'

class Auth {
    constructor() {
        this.token = null
        this.user = null
        this.token = localStorage.getItem(TOKEN_KEY)
        const userJson = localStorage.getItem(USER_KEY)
        if (userJson && userJson !== 'undefined') {
            this.user = JSON.parse(userJson)
        }
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Auth()
        }
        return this._instance
    }

    setUserToken(user, token) {
        this.user = user
        this.token = token
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        localStorage.setItem(TOKEN_KEY, token)
    }

    setUser(user) {
        this.user = user
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    }

    clearUserToken() {
        this.user = null
        this.token = null
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }

    // 属性函数
    get is_authed() {
        return this.user && this.token
    }
}

export default Auth.getInstance()
