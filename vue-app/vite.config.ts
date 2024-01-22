import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vue-app',
      filename: 'remoteEntry.js',
      exposes: {
        './web-components': './src/main.ts'
      }
    })
  ],
  server: {
    port: 4176,
  },
  preview: {
    port: 4176
  }
})
