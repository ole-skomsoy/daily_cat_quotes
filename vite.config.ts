import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/', // root path for Firebase Hosting
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png', 'robots.txt'],
      manifest: {
        name: 'Daily Cat Quotes',
        short_name: 'CatQuotes',
        description: 'Get your daily dose of cat wisdom!',
        theme_color: '#ffffff',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        runtimeCaching: [
          { urlPattern: ({ request }) => request.destination === 'document', handler: 'NetworkFirst' },
          { urlPattern: ({ request }) => request.destination === 'image', handler: 'CacheFirst' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
  proxy: {
    '/api/zenquote': {
      target: 'https://zenquotes.io',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/zenquote/, '/api/random'),
    },
  },
},
  preview: {
  proxy: {
    '/api/zenquote': {
      target: 'https://zenquotes.io',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/zenquote/, '/api/random'),
    },
  },
},

  build: {
    outDir: 'dist', // Firebase default
    emptyOutDir: true, // clears old builds
  },
})
