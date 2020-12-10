import ViteComponents from 'vite-plugin-components'
import voie from 'vite-plugin-voie'

export default {
  plugins: [
    voie(),
    ViteComponents({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: false,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],

      // vite config
      // currently, vite does not provide an API for plugins to get the config https://github.com/vitejs/vite/issues/738
      // you will need to pass `alias` and `root` if you set them in vite config
      alias: {},
      root: process.cwd(),
    }),
  ],
}
