import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host:'0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://43.138.61.49:30000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
