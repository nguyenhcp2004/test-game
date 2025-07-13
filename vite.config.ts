import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: "automatic" // phải là 'automatic' nếu dùng JSX runtime mới
  },
  base: "/test-game"
});
