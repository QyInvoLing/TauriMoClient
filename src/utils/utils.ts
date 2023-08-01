/*
 * @Author: QyInvoLing
 * @Date: 2023-07-27 10:23:11
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-27 10:25:15
 * @FilePath: \tauri-mo-client\src\utils\utils.ts
 * @Description: 
 */
export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
export const debounce = (fn: (...arg: any[]) => any, duration: number = 300) => {
    let timer = -1;
    return function (this: unknown, ...args: any[]) {
        if (timer > -1) {
            clearTimeout(timer);
        }
        timer = window.setTimeout(() => {
            fn.bind(this)(...args);
            timer = -1;
        }, duration);
    }
}
/**
 * 获取形如"18:03:05"格式的时间字符串
 * @returns 
 */
export const getTimeString = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}
/**
 * 为注册登录提供的鲨256哈希
 * 
 * 虽然在前端这里hash一次也防不住中间人攻击，但是有些等保要求会要求必须这样做
 * @param str 
 * @returns 
 */
export const sha256 = async (str: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return hashHex
}


