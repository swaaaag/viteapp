<template>
  <div>
    <page-main title="测试页面" title-other="组件测试">
        <button-panel type="primary" plain:true title="click" size="large"></button-panel>
        <table-panel :column-data="tableData.columns" :table-data="tableData.list" :show-footer="false">
            <template #rz="{row}">
                <el-progress :percentage="row.RZCount" />
            </template>
            <template #wj="{row}">
                <el-progress :percentage="row.WJCount" />
            </template>
        </table-panel>
        <select-panel
            v-model="tableData.TrainClassID"
            :data="classList"
            placeholder="请选择班级"
            label="ClassName"
            c-key="ClassID"
            c-value="ClassID"
            @input="handleClassSelect(tableData.TrainClassID)"
        />

        日期{{ date }}
        <Editor :modelValue="ediValue" showMode="default" @update:modelValue="updateEdiValue($event)"></Editor>
        <el-button @click="clickbtn">click</el-button>
        <!-- <div class="editor-box">
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
        </div> -->
        <!-- <el-upload
            :file-list="fileList"
            action=""
            multiple
            :auto-upload = "false"
            :on-change="onChange"
            >
            <template #trigger>
                  <button-panel>选择文件</button-panel>
            </template>
        </el-upload>
        <preview-docx :file="File"></preview-docx>
        <qrcode-vue value="https://www.baidu.com/" size='200'></qrcode-vue><br /> -->
    </page-main>
  </div>
</template>

<script setup name="test">
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import '@wangeditor/editor/dist/css/style.css' // 引入 css
// import QrcodeVue from 'qrcode.vue'
// import { getCurrentInstance } from 'vue'
// components: { Editor, Toolbar, QrcodeVue };
const { proxy } = getCurrentInstance()  // 获取当前实例
const classList = ref([
  {
    ClassID: 1,
    ClassName: '一班'
  },
  {
    ClassID: 2,
    ClassName: '二班'
  },
  {
    ClassID: 3,
    ClassName: '三班'
  }
]);
const tableData = ref({
    list: [
      {
        StuName: '张三',
        age: '18',
        RZCount: 80,
        WJCount: 20,
      },
      {
        StuName: '李四',
        age: '20',
        RZCount: 50,
        WJCount: 30,
      }
    ],
    columns: [
        {
            prop: 'StuName',
            label: '姓名',
            width: '300'
        },
        {
            prop: 'age',
            label: '年龄',
            width: '300'
        },
        {
            prop: 'RZCount',
            label: '周期进度',
            width: '300',
            slotName: 'rz'
        },
        {
            prop: 'WJCount',
            label: '考核进度',
            slotName: 'wj'
        }
    ],
    TrainClassID: 1,
    TrainClassName: '一班'
})

const handleClassSelect = (id) => {
    const name = classList.value.find(item => item.ClassID === id).ClassName
    tableData.value.TrainClassName = name
}

const date = proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss') // dayjs 插件格式化日期
//const editorValue = ref('') // 组件初始化编辑器值（组件抽离暂未完成）
//编辑器实例，必须用 shallowRef
// const editorRef = shallowRef()
// const mode = "simple"   // 可选值：simple, default
// // 内容 HTML
// const valueHtml = ref('<p>hello</p>')
// // 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })
// const toolbarConfig = {}
// const editorConfig = { placeholder: '请输入内容...' }
// // 组件销毁时，也及时销毁编辑器
// onBeforeUnmount(() => {
//     const editor = editorRef.value
//     if (editor == null) return
//     editor.destroy()
// })
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const File = ref(null);
const fileList = ref([]);
const onChange = (file) => {
  File.value = file.raw // 本地预览文件
}
// const handleClick = () => {
//   alert('click')
// }

const ediValue = ref('init');
setTimeout(() => {
    ediValue.value = '<p>模拟 Ajax 异步设置内容</p>'
}, 500);
const clickbtn = () => {
  console.log(ediValue.value)
}
const updateEdiValue = (newValue) => {
  ediValue.value = newValue
}
</script>

<style lang="scss" scoped>
.editor-box{
    margin: 20px;
    width: 50%;
}
</style>
