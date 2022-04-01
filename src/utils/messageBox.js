import {MessageBox} from 'element-ui'

class ApiMessageBox {
    confrim(params = {}) {
        const message = params.message || '您确定要执行此操作吗？'
        const confrimCallback = params.confrimCallback || null
        const cancelCallback = params.cancelCallback || null
        const type = params.type || 'warning'
        MessageBox.confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type
        }).then(() => {
            if (confrimCallback) {
                confrimCallback()
            }
        }).catch(() => {
            if (cancelCallback) {
                cancelCallback()
            }
        })
    }
}

export default new ApiMessageBox();
