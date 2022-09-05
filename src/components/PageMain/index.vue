<script setup name="PageMain">
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    titleOther: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <div
        :class="{
            'page-main': true
        }" :style="{
            'height':  height
        }"
    >
        <div v-if="title" class="title-container flex-align-center justify-between">
            <div class="flex" style="    font-size: 17px;font-weight: 700;">
                {{ title }}
                <span class="title-other">
                    {{titleOther}}
                </span>
                <div class="title-other-content">
                    <slot name="title-other-content"></slot>
                </div>
            </div>
            <div>
                <slot name="title-left"></slot>
            </div>
        </div>
        <el-divider v-if="title"/>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.title-other {
    font-size: 10px;
    color: #afaaaa;
    margin-left: 10px;
    position: relative;
    top: 5px;
}
.title-icon {
    font-size: 17px;
    margin-right: 5px;
    color: #0079fe;
}
.title-other-content {
    margin-left: 15px;
}
.el-divider--horizontal{
    margin: 0 0 24px 0;
}
.page-main {
    position: relative;
    margin: 20px;
    padding: 20px;
    background-color: var(--el-bg-color-overlay);
    border-radius: 8px;
    .title-container {
        width: calc(100% + 40px);
        padding: 14px 20px;
        margin-left: -20px;
        margin-top: -20px;
        color: var(--el-text-color-primary);
    }
}
</style>
