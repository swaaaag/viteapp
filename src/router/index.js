import { ElMessage } from "element-plus";
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import Progress from "@/util/nprogress";
const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '控制面板'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
            },
            {
                path: "/test",
                name: "test",
                meta: {
                    title: '测试页面'
                },
                component: () => import ( /* webpackChunkName: "test" */ "@/views/modules/testPage/index.vue")
            },
            {
                path: "/three",
                name: "three",
                meta: {
                    title: '3d页面'
                },
                component: () => import ( /* webpackChunkName: "test" */ "@/views/modules/three.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    Progress.start();
    if(to.meta.developing){
        ElMessage.info('该功能正在开发中...');
        return;
    }else{
        next();
    }
})

router.afterEach(() => {
    Progress.done();
})
export default router;