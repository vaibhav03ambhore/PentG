// vite.config.js
import react from "file:///D:/OneDrive/Desktop/mycode/PentG/frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///D:/OneDrive/Desktop/mycode/PentG/frontend/node_modules/vite/dist/node/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\OneDrive\\Desktop\\mycode\\PentG\\frontend";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  // server: {
  //   proxy: {
  //     '/api/': {
  //       target: 'https://pentg-backend-url.onrender.com',
  //       changeOrigin: true, 
  //     }
  //   }
  // },
  build: {
    outDir: "dist"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG15Y29kZVxcXFxQZW50R1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxteWNvZGVcXFxcUGVudEdcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L09uZURyaXZlL0Rlc2t0b3AvbXljb2RlL1BlbnRHL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcblxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIHNlcnZlcjoge1xyXG4gIC8vICAgcHJveHk6IHtcclxuICAvLyAgICAgJy9hcGkvJzoge1xyXG4gIC8vICAgICAgIHRhcmdldDogJ2h0dHBzOi8vcGVudGctYmFja2VuZC11cmwub25yZW5kZXIuY29tJyxcclxuICAvLyAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIFxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuICBcclxuICBcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZGlzdCdcclxuICB9XHJcbn0pXHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULE9BQU8sV0FBVztBQUMzVSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBRWpCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFXQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
