import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron/renderer'
import polyfillExports from 'vite-plugin-electron/polyfill-exports'
import electronConfig from './vite-electron.config'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    electron(electronConfig),
    electronRenderer(),
    polyfillExports(),
    Pages({
      importMode: "async"
    }),
  ],
  build: {
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: "/index.html"
      },
      output: {
        entryFileNames(chunkInfo) {
          return `${chunkInfo.name}.[hash].js`
        },
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./"),
    }
  }
})
