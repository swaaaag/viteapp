<template>
    <div class="header">
        <div class="logo">后台管理</div>
         
        <div class="header-right">
            <div class="us-name">
                <el-popover placement="bottom" trigger="hover">
                    <template #reference>
                        <div class="us-text"><div><el-icon size="20px"><Avatar /></el-icon></div><div>{{ userName }}</div><div><el-icon size="20px"><ArrowDown /></el-icon></div></div>
                    </template>
                    <div class="link-text">基本信息</div>
                </el-popover>
            </div>
            <div class="us-mes">
                <el-popover placement="bottom" trigger="hover">
                    <template #reference>
                        <el-badge :value="count" class="item">
                            <el-icon size="20px"><BellFilled /></el-icon>
                        </el-badge>
                    </template>
                    <div class="link-text">消息中心</div>
                </el-popover>
                
            </div>
            <div class="logout" @click="logout">退出</div>
        </div>
    </div>
</template>

<script setup name="header">
import { ref } from "vue";
import userStore from "@/store/modules/user";
    const store = userStore();
    const userName = ref(store.userName);
    const count = ref(3);
    const logout = () => {
        store.logout();
    }
</script>
<style lang="scss" scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;     
    background-color: #242f42;
    .logo {
        font-size: 22px;
        color: #fff;
        text-align: center;
        width: 250px;
        line-height: 70px;
        display: inline-block;
    }
    .header-right{
        color:white;
        width: 30%;
        float: right;
        display: flex;
        justify-content: flex-end;
        padding: 20px;
        color: bisque;
        .us-name{
            margin: 0 15px;
            cursor: pointer;
            display: flex;
            .us-icon{
                padding: 3px;
            }
            .us-text{
                display: flex;
            }
        }
        .us-mes{
            cursor: pointer;
            margin: 0 15px;
        }
        .logout{
            cursor: pointer;
            margin: 0 15px;
        }
    }
}
.link-text{
    text-align: center;
    cursor: pointer;
    padding: 5px;
    
}
.link-text:hover{
        color: rgb(74, 146, 214);
        background: rgb(219, 211, 211);
    }
</style>
