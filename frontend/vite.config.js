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
      '/api': 'https://maasparsh.onrender.com', // Adjust the proxy target if necessary
    },
  },
})

