import { defineStore } from "pinia";
import { local } from '@/util/localStorage'
import { userApi } from '@/api/modules/userApi';

const userStore = defineStore(
    'user',  // 唯一ID
    {
        state: () => ({
            userInfo: local.get('userInfo') || {},
            userName: local.get('userName') || '',
            token: local.get('token') || '',
            failure_time: local.get('failure_time') || '',
            // permissions: []
        }),
        getters: {
            // isLogin: state => {
            //     let retn = false
            //     if (state.token) {
            //         if (new Date().getTime() < state.failure_time * 1000) {
            //             retn = true
            //         }
            //     }
            //     return retn
            // }
        },
        actions:{
            login(params) {
                return new Promise((resolve, reject) => {  
                    userApi.getUserInfo(params).then(res => {
                        const failure_time = Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60
                        local.set('userInfo', res.Data)
                        local.set('token', res.Data.UserToken)
                        local.set('failure_time', failure_time)
                        local.set('userName', res.Data.NickName)
                        this.userName = res.Data.NickName
                        this.userInfo = res.Data
                        this.token = res.Data.UserToken
                        this.failure_time = failure_time
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })                  
                })
            },
            logout() {
                return new Promise(resolve => {
                    local.clear();
                    this.token = ''
                    this.failure_time = ''
                    this.userInfo = {}
                    this.userName = ''
                    resolve()
                })
            },
        }
    }
);

export default userStore