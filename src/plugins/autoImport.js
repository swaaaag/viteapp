import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
    return autoImport({
        imports: [
            'vue',
            'vue-router',
            {
                'vue': [
                    'defineProps',
                    'defineEmits',
                    'defineExpose',
                    'withDefaults'
                ]
            },
            'pinia'
        ],
        dts: false
    })
}
