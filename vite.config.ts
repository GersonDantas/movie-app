import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    include: [
      'test/unit/**/*.spec.ts',
      'src/**/*.spec.ts'
    ]
  }
})
