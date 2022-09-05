import axios from 'axios';
import { local } from '@/util/localStorage';
import userStore from '@/store/modules/user';
import { elAlert, errorMsg } from '@/util/message';

const yqUrl =  import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/yq/' : import.meta.env.VITE_APP_API_BASEURL
const yhUrl =  import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/yh/' : import.meta.env.VITE_APP_API_USER_BASEURL

// const toLogin = () => {
//     userStore().logout().then(() => {
//         router.push({
//             name: 'login',
//             query: {
//                 redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
//             }
//         })
//     })
// }

const service = axios.create({
    baseURL: yqUrl,
    timeout: 10000,
    responseType: 'json'
})

const realtoken = local.get('yq_student_token');
const testToken = '0aaf66ea-f4d4-42b7-9f95-f29478e81aa6';
const token = import.meta.env.MODE === 'production' ? realtoken : testToken;

service.interceptors.request.use(
    request => {
        if (request.requestBaseUrl === 'yh') {
            request.baseURL = yhUrl
        }
        /**
         * 全局拦截请求发送前提交的参数
         * 以下代码为示例，在请求头里带上 token 信息
         */
        request.headers['Authorization'] = token
        return request
    }
);

service.interceptors.response.use(
    
    response => {
        /**
         * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
         * 假设返回数据格式为：{ status: 1, error: '', data: '' }
         * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
         * 请求出错时 error 会返回错误信息
         */
        const status = response.data.Status     //视情况而定
        if (response.data instanceof Blob) {
            return Promise.resolve(response.data)
        } // 判断是否是blob类型
        if (status === 200) {
            return Promise.resolve(response.data)
        } else if (response.data.Data === '身份未验证') {   //视情况而定
            elAlert({
                msg: '身份已过期，请重新登录',
                type: 'error',
                confirm: () => {
                    //toLogin()
                }
            })
        } else {
            errorMsg(response.data.Data)
            return Promise.reject(response.data)
        }
    },
    error => {
        let message = error.message
        if (message === 'Network Error') {
            message = '后端网络故障'
        } else if (message.includes('timeout')) {
            message = '接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '接口' + message.substr(message.length - 3) + '异常'
        }
        errorMsg(message)
        return Promise.reject(error)
    }
);
const request = function({ url, method, data, params, uploadFile, requestBaseUrl, responseType }) {
    const options = {
        url,
        method,
        requestBaseUrl
    }

    if (data) {
        options.data = data
    }

    if (params) {
        options.params = params
    }
    if (requestBaseUrl) {
        options.requestBaseUrl = requestBaseUrl
    }
    if (responseType) {
        options.responseType = responseType
    }
    options.uploadFile = !!uploadFile

    return service(options)
}

request.get = function(url, params, requestBaseUrl,responseType) {
    return request({
        url,
        params,
        requestBaseUrl,
        responseType,
        method: 'get'
    })
}

request.post = function(url, data, requestBaseUrl) {
    return request({
        url,
        data,
        requestBaseUrl,
        method: 'post'
    })
}

request.put = function(url, data) {
    return request({
        url,
        data,
        method: 'put'
    })
}

request.patch = function(url, data) {
    return request({
        url,
        data,
        method: 'patch'
    })
}

request.delete = function(url, data) {
    return request({
        url,
        data,
        method: 'delete'
    })
}



export default request;
