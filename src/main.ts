/*
 * @Author: QyInvoLing
 * @Date: 2023-07-26 14:10:32
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-27 11:21:51
 * @FilePath: \tauri-mo-client\src\main.ts
 * @Description: 
 */
import { createApp } from "vue";
import "./styles.css";
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import router from '@/router/router';
import { pinia } from '@/store/index'
import App from './App.vue';


const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount("#app");
