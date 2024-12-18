/*
 * @Author: QyInvoLing
 * @Date: 2023-07-26 14:10:32
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-26 17:40:33
 * @FilePath: \tauri-mo-client\vite.config.ts
 * @Description: 
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue(), AutoImport({
    resolvers: [ArcoResolver()],
  }),
  Components({
    resolvers: [
      ArcoResolver({
        sideEffect: true
      })
    ]
  })],
  resolve: {
    alias: {
      '@': '/src' // 使编辑器可以正确识别并跳转到对应文件
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
}));
