import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { transformerDirectives, transformerVariantGroup } from 'unocss'
import unocss from 'unocss/vite'
import icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueComponents from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const dirname = import.meta.dirname

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '@': `${path.resolve(dirname, 'src')}`,
      },
    },

    plugins: [
      nodePolyfills(),
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
          transformerVariantGroup(),
        ],
      }),
      vue(),
      vueJsx(),
    ],
    server: {
      proxy: {
        [`${env.VITE_APP_API_PREFIX}/`]: {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_API_PREFIX}\/`), ''),
          secure: false,
        },
      },
    },
  }
})
