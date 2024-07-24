import { defineConfig, splitVendorChunkPlugin } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [
      react(),
      splitVendorChunkPlugin(),
      EnvironmentPlugin({
        APP_ID: JSON.stringify(process.env.APP_ID),
      }),
    ],
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
