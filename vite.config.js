import { defineConfig,loadEnv } from 'vite'
import createVitePlugins from './src/plugins'

const fs = require('fs')
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>{
      const env = loadEnv(mode, process.cwd())

        // 全局 scss 资源
      const scssResources = []
      fs.readdirSync('src/assets/styles/resources').map(dirname => {
          if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
              scssResources.push(`@import "src/assets/styles/resources/${dirname}";`)
          }
      })
      return {
        base: './',
        // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
        server: {
            host: '0.0.0.0',
            https: false,
            open: true,
            port: 9090,
            proxy: {
                /*
                * 云桥接口
                * 接口地址：http://api.yunql.cn/swagger/ui/index
                *  */
                '/yq': {
                    target: env.VITE_APP_API_BASEURL,
                    changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY === 'true',
                    rewrite: path => path.replace(/\/yq/, '')
                },
                /*
                * 用户管理接口
                * 接口地址：http://yh.softtone.cn/api/swagger/ui/index#/
                *  */
                '/yh': {
                    target: env.VITE_APP_API_USER_BASEURL,
                    changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY === 'true',
                    rewrite: path => path.replace(/\/yh/, '')
                }
            }
        },
        // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
        build: {
            assetsDir: 'static',
            rollupOptions:{
              input:{
                index:path.resolve(__dirname,"index.html"),
              },
              output:{
                chunkFileNames:'static/js/[name]-[hash].js',
                entryFileNames:"static/js/[name]-[hash].js",
                assetFileNames:"static/[ext]/name-[hash].[ext]"
              }
            },
            outDir: mode == 'production' ? 'dist' : `dist-${mode}`,
            sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
        },
        optimizeDeps: {
            //include: optimizeDepsElementPlusIncludes
        },
        plugins: createVitePlugins(env, command === 'build'),
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                "@c":path.resolve(__dirname,"src/components"),
                "/images":"src/assets/images/"
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: scssResources.join('')
                }
            }
        }

      }
})