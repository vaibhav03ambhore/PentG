import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import path from "path"

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      '/api/': {
        target: 'https://pentg-backend-url.onrender.com',
        changeOrigin: true, 
      }
    }
  },
 
  build: {
    outDir: 'dist'
  }
})

