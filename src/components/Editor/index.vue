<script setup name="Editor">    //此组件未完成
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
components: { Editor, Toolbar };
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    showMode: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref(props.showMode)  // 可选值：simple, default
// 内容 HTML
const valueHtml = ref(props.modelValue)
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
//组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

watch(() => valueHtml.value, newValue => {
   emit('update:modelValue', newValue)
})
watch(() => props.modelValue, newValue => {
    valueHtml.value = newValue
})


</script>

<template>
    <div class="editor">
        <div style="border: 1px solid #ccc">
        
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 300px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
             />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.editor {
    margin: 20px;
    width: 50%;
}
</style>
