import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite' // 按需加载自定义组件

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    uni(),
    // 按需引入
    Components({
      deep: true, // 搜索子目录
      dirs: ['src/components'] // 按需加载的文件夹
    })
  ]
})
