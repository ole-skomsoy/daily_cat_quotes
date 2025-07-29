import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Proxy for FavQs API
      '/api/quote': {
        target: 'https://favqs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/quote/, '/api/qotd'),
      },
      // Proxy for ZenQuotes API
      '/api/zenquote': {
        target: 'https://zenquotes.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zenquote/, '/api/random'),
      },
    },
  },
})
