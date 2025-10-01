import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        // Replace fixed color in SVGs (e.g. "#353535") with "currentColor"
        replaceAttrValues: {
          "#353535": "currentColor",
        },
        // Expand props so that props like `fill`, `className`, etc. get forwarded
        expandProps: "start",
      },
      // You can also configure include / exclude patterns, etc.
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
