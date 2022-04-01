const filters = {
    dateFormat: function (value, pat) {
        function addZero(value) {
            return value.toString().padStart(2, 0)
        }

        let date = new Date(value)
        let y = date.getFullYear()
        let m = addZero(date.getMonth() + 1)
        let d = addZero(date.getDate())
        let h = addZero(date.getHours())
        let s = addZero(date.getSeconds())
        let min = addZero(date.getMinutes())

        if (pat && pat.toLowerCase('yyyy-mm-dd')) {
            return `${y}-${m}-${d}`
        } else {
            return `${y}-${m}-${d} ${h}:${s}:${min}`
        }
    }
}

export default filters
