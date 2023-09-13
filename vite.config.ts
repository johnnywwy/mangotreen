import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// @ts-nocheck
import { svgstore } from "./src/vite_plugins/svgstore";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mangotreen/dist/",
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      '/api/v1': {
        target: "http://121.196.236.94:3000"
      }
    }
  },
});
