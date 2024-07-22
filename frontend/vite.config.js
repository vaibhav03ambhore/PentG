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
  // server:{
  //   proxy:{
  //     '/api/': 'https://pentg-backend.onrender.com/'
  //   }
  // },
  build: {
    outDir: 'dist'
  }
})

