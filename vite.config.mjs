import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: false,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api/send-prompt': 'http://localhost:3000',
      '/api/restr': 'http://localhost:3000',
      '/api/filter-words': 'http://localhost:3000',
      '/api/words': 'http://localhost:3000',
    },
  },
})
