import path from 'path'
import ViteComponents from 'vite-plugin-components'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'
import tasklists from 'markdown-it-task-lists'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      // 'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/promise',
      'gun/lib/then',
      'gun/lib/webrtc',
      'gun/lib/load',
      'gun/lib/radix',
      'gun/lib/rindexed',
      'gun/lib/open',
    ],
  },
  plugins: [
    VitePWA({
      manifest: {
        name: 'Project app',
        theme_color: '#777',
        icons: [
          {
            src: '/icons/feeds192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/icons/feeds512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
    vue(),
    Voie({
      extensions: ['vue', 'md'],
    }),
    Markdown({
      markdownItOptions: {
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(tasklists)
      },
    }),
    ViteComponents({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,
      // allow auto import and register components used in markdown
      customLoaderMatcher: (path) => path.endsWith('.md'),

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],
    }),
    vueI18n({
      compositionOnly: false,
      include: path.resolve(__dirname, './src/locales/**'),
    }),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
  ],
})
