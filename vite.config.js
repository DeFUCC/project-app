import path from "path";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
// import { VitePWA } from 'vite-plugin-pwa'
import alias from "@rollup/plugin-alias";
import Pages from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

const moduleExclude = (match) => {
  const m = (id) => id.indexOf(match) > -1;
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id;
    },
    load(id) {
      if (m(id)) return `export default {}`;
    },
  };
};

export default {
  build: {
    rollupOptions: {
      external: ["text-encoding", "@peculiar/webcrypto"],
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: [
      "gun",
      "gun/gun",
      "gun/sea",
      "gun/sea.js",
      "gun/lib/then",
      "gun/lib/webrtc",
      "gun/lib/radix",
      "gun/lib/radisk",
      "gun/lib/store",
      "gun/lib/rindexed",
    ],
  },
  plugins: [
    moduleExclude("text-encoding"),
    // VitePWA({
    //   manifest: {
    //     name: 'Project app',
    //     theme_color: '#777',
    //     icons: [
    //       {
    //         src: '/icons/feeds192.png',
    //         type: 'image/png',
    //         sizes: '192x192',
    //       },
    //       {
    //         src: '/icons/feeds512.png',
    //         type: 'image/png',
    //         sizes: '512x512',
    //       },
    //     ],
    //   },
    // }),
    alias({
      entries: [
        { find: /^store\@(.*)/, replacement: "/src/store/$1.js" },
        { find: /^use\@(.*)/, replacement: "/src/use/$1.js" },
      ],
    }),

    vue(),
    Pages({
      dirs: "src/pages",
      importMode: "sync",
    }),
    WindiCSS({
      scan: {
        dirs: ["src/", "./"],
        include: ["index.md"],
        exclude: ["/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: [
        "vue",
        {
          "@vueuse/core": ["useStorage"],
        },
      ],
    }),
    Icons({
      defaultStyle: "vertical-align: middle;",
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["vue", "ts", "js"],
      directoryAsNamespace: true,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
      resolvers: [
        IconsResolver({
          prefix: false,
        }),
      ],
    }),
    vueI18n({
      compositionOnly: false,
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
  ],
};
