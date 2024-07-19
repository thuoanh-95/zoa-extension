import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [react(), splitVendorChunkPlugin()],
    server: {
      host: true,
      port: 3000,
      strictPort: true,
      hmr: {
        overlay: false,
      },
    },
  });
};
