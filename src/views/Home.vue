<template>
    <div>
        <v-header />
        <v-sidebar />
        <div class="content-box">
            <div class="content">
                <router-view></router-view>
                 <!-- <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from "../components/Header.vue";
import vSidebar from "../components/Sidebar.vue";

export default {
    components: {
        vHeader,
        vSidebar,
    },
    setup() {
        
    },
};
</script>
