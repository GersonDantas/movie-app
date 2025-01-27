import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [
        '**/*.config.*',
        'src/main.ts',
        'src/types/movie.ts',
        'src/router/**',
        'node_modules/**',
        'test/**'
      ],
      reporter: ['text', 'json', 'html'],
      include: [
        'src/**/*.{js,ts,vue}'
      ]
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
