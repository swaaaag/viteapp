
export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

export function  formatDate(date){      //yyyy-mm-dd
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

export function isExternalLink(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function resolveRoutePath(basePath, routePath) {
    if (isExternalLink(routePath)) {
        return routePath
    }
    if (isExternalLink(basePath)) {
        return basePath
    }
    return basePath ? path.resolve(basePath, routePath) : routePath
}

export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value)
}

/**
 * @description 生成随机数
 * @param Max 最大值
 * @param Min 最小值
 * @returns {number}
 */
export function randomMath(Max = 1, Min = 100) {
    const Range = Max - Min
    const Rand = Math.random()
    return (Min + Math.round(Rand * Range))
}

/**
 * @description 替换数组下某一数据的key值字段名
 * @param arr -  数组
 * @param oldArg - 旧的key值
 * @param newArg - 新的key值
 * @returns {*[]}
 */
export const replaceArr = (arr, oldArg, newArg) => {
    const newArr = []
    arr.forEach(item => {
        item[newArg] = item[oldArg]
        delete item[oldArg]
        newArr.push(item)
    })
    return newArr
}

export const isArray = value => {
    return Array.isArray(value)
}

export  const getImg = name => (name ? new URL(`/src/assets/images/${name}`, import.meta.url).href : '')

/**
 * 四舍五入
 * @param  {number} num     [待处理数字]
 * @param  {number} decimal [需要保留的小数位]
 * @return {number}         []
 */
export const round = (num, decimal = 2) => {
    if (isNaN(num)) {
        return 0
    }
    const p1 = Math.pow(10, decimal + 1)
    const p2 = Math.pow(10, decimal)
    return Math.round(num * p1 / 10) / p2
}

