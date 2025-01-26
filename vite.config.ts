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
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['https://sunnyekb.ru/'],
    host: true,
    strictPort: true,
    port: 5173,
  },
});
