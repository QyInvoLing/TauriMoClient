import { createApp } from "vue";
import router from '@/router/router';
import "./styles.css";
import App from "./App.vue";
//import { app, window } from '@tauri-apps/api';
const app = createApp(App)
// app.init({
//     tauri: {
//       // 其他配置
//       // ...
//       window: {
//         menu: false, // 是否启用菜单栏
//         title: 'Tauri MO Client——兰博玩你麻痹', // 窗口标题
//         width: 800, // 初始窗口宽度
//         height: 600, // 初始窗口高度
//       }
//     }
//   });
app.use(router)
app.mount("#app");
