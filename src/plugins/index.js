import vue from '@vitejs/plugin-vue'
import createAutoImport from './autoImport'
import createComponents from './components'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue(),
    ]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createComponents())
    return vitePlugins
}
