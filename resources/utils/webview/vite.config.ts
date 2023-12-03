import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../../webviews/auth',
    emptyOutDir: true,
    minify: 'esbuild',
    reportCompressedSize: false,
  }
})
