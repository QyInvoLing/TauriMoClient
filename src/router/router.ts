/*
 * @Author: QyInvoLing
 * @Date: 2023-07-26 17:25:33
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-26 17:38:04
 * @FilePath: \tauri-mo-client\src\router\router.ts
 * @Description: 
 */

import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/lobby',
            name: 'lobby',
            component: () => import('@/views/lobby/index.vue'),
            meta: {
                requiresAuth: true,
            },
        },

    ],
    scrollBehavior() {
        return { top: 0 };
    },
})

export default router;
