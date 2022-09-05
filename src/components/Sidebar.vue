<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const onRoutes = computed(() => {
            return route.path;
        });
        
        const items = ref([
            {
                icon: "homeFilled",
                index: "/dashboard",
                title: "控制面板",
                show:true
            },
            {
                icon: "homeFilled",
                index: "/test",
                title: "测试页面",
                show:true
            },
            {
                icon: "homeFilled",
                index: "/three",
                title: "3d页面",
                show:true
            }
        ]);
           
        return {
            items,
            onRoutes,
        };
    },
};
</script>


<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items" :key="item.index">
                <div v-show="item.show">
                    <template v-if="item.subs">
                        <el-sub-menu :index="item.index" :key="item.index">
                            <template #title>
                                <span class="sidebar-title">
                                    <el-icon class="pb3"><component :is="item.icon" /></el-icon>
                                    {{ item.title }}
                                </span>
                            </template>
                            <div v-for="subItem in item.subs" :key="subItem.index">  
                                <el-menu-item class="menu-fr" :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                                </el-menu-item>
                            </div>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <template #title>
                                <span class="sidebar-title">                               
                                    <el-icon class="pb3"><component :is="item.icon" /></el-icon>
                                    {{ item.title }}
                                </span>
                            </template>
                        </el-menu-item>
                    </template>
                </div>
            </template>
        </el-menu>
    </div>
</template>



<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #324157;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
el-menu-item {
    font-size: 20px;
}
.sidebar-title {
    font-size: 20px;
    margin-left: 30px;
    .pb3 {
        padding-bottom: 3px;
    }
}

.menu-fr{
    margin-left: 3em;
}
    
</style>
