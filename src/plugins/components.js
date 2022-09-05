import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents() {
    return components({
        resolvers: [
            ElementPlusResolver()
        ],
        dirs: ['src/components'],   // 要搜索组件的目录的相对路径
        deep: true, // 搜索子目录
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
        dts: false
    })
}
