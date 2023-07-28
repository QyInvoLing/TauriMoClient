/*
 * @Author: QyInvoLing
 * @Date: 2023-07-27 10:28:51
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-27 11:25:58
 * @FilePath: \tauri-mo-client\src\views\login\api.ts
 * @Description: 
 */

import { postForm } from '@/api/request'
export const login = async(username: string, password: string) => {
    const result = await postForm("/login",{username,password})
    console.log("[INFO]登录结果：",result.data)
    return result
}