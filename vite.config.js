import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'menu.html'),
      },
    },
    sourcemap: true,
    minify: false,
    cssMinify: false 
  },
})