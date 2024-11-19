import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: './dist', 
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // Adjust the proxy target if necessary
    },
  },
})

