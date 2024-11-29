import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/operation": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
    port: 4000,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
