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
export const debounce = (fn: (...arg: any[]) => any, duration: number = 300)=> {
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