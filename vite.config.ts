import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    cors: {
			origin: ['https://sunnyekb.ru/', 'http://localhost:5173'],
			methods: ['GET', 'POST', "PATCH", "PUT", "DELETE"],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: true,
    host: true,
    strictPort: true,
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
});
