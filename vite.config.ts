import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@server": path.resolve(__dirname, "./src/server"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@feature": path.resolve(__dirname, "./src/feature"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@scripts": path.resolve(__dirname, "./src/scripts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
});
