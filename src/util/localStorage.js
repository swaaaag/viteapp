export const local  = {
    set(key, data, datetime = 0) {
        let cacheValue = {
            content: data,
            datetime: parseInt(datetime) === 0 ? 0 : new Date().getTime() + parseInt(datetime) * 1000
        }
        return localStorage.setItem(`${key}`, JSON.stringify(cacheValue))
    },
    get(key) {
        try {
            const value = JSON.parse(localStorage.getItem(`${key}`))
            if (value) {
                let nowTime = new Date().getTime()
                if (nowTime > value.datetime && value.datetime !== 0) {
                    localStorage.removeItem(`${key}`)
                    return null
                }
                return value.content
            }
            return null
        } catch (err) {
            return null
        }
    },
    remove(key) {
        return localStorage.removeItem(`${key}`)
    },
    clear() {
        return localStorage.clear()
    }
}
