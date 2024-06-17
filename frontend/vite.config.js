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
  server:{
    proxy:{
      '/api/': 'http://localhost:3000',
      "/uploads/": "http://localhost:3000",
    }
  }
})

