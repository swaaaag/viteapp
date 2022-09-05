<template>
    <div  class="file">
        <div ref="preview" />
    </div>
</template>

<script setup>
import { renderAsync } from 'docx-preview'
import { watch } from 'vue'
import axios from 'axios'
const preview = ref(null)
const props = defineProps({
    file: {
        type: null
    },
    filrSrc: {
        type: null
    }
})

watch(() => props.file, (n, o) => {
    setPreview()
})

watch(() => props.fileSrc, (n, o) => {
    setPreviewSrc()
})

const setPreview = () => {
    renderAsync(props.file, preview.value)
}
const setPreviewSrc = () => {
    axios.get(props.fileSrc, { responseType : 'blob'}).then(res => {
      renderAsync(res.data, preview.value)
  })
}
</script>

<style scoped>
.file{
    height: 50px;
    overflow-x: auto;
}
</style>
