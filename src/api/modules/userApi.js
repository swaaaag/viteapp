import request from '@/api';

console.log(import.meta.env.MODE)
export const userApi = {
    getUserInfo(params) {
        return request.get('/User/GetUserInfo', params, 'yh')
    }
}