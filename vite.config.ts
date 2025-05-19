import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { transformerDirectives } from 'unocss'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const dirname = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(dirname, 'src')}`,
    },
  },

  plugins: [
    autoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
    vueComponents({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
    icons(),
    unocss({
      transformers: [
        transformerDirectives(),
      ],
    }),
    vue(),
  ],
})
