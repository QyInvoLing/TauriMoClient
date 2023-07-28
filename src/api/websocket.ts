//import WebSocket from 'websocket'
import { webSocketServer } from './server'

const callbacks: Record<string, Callback[]> = {}
interface Callback {
    name: string
    callback: Function
}
let ws: WebSocket

export const connect = (jwt: string) => {
    ws = new WebSocket(webSocketServer + "/ws")
    ws.onopen = () => {// 连接建立后
        console.log("[INFO]WebSocket连接建立成功，开始鉴权.")
        ws.addEventListener("message", (event) => {
            console.log("[INFO]收到服务端消息：", event.data)
        })
        sendCommand({ jwt })//发送鉴权消息
    }
    ws.onclose = () => {//注册断开回调，以便于在连接断开时进行处理
        executeCallbacks("close")
    }
}
export const disconnect = () => {
    ws.close()
}
//为WebSocket事件和其他自定义事件注册回调
export const registerCallback = (eventName: string, name: string, callback: Function) => {
    if (callbacks[eventName] == undefined) {
        callbacks[eventName] = [{ name, callback }]
        console.log(`[INFO]为${eventName}事件首次添加新回调${name}`)
    } else {
        callbacks[eventName].push({ name, callback })
        let foundDuplicated = false
        for (let i in callbacks[eventName]) {//重名覆盖
            if (callbacks[eventName][i].name == name) {
                foundDuplicated = true
                callbacks[eventName][i].callback = callback
                console.log(`[INFO]为${eventName}事件覆盖了已有回调${name}`)
                break
            }
        }
        if (!foundDuplicated) {
            callbacks[eventName].push({ name, callback })
            console.log(`[INFO]为${eventName}事件添加新回调${name}`)
        }//没有重名的就新增
    }
}
//删除已添加的事件回调
export const unregisterCallback = (eventName: string, name: string) => {
    if (callbacks.hasOwnProperty(eventName)) {
        for (let i in callbacks[eventName]) {
            if (callbacks[eventName][i].name == name) {
                delete (callbacks[eventName])[i]
                break
            }
        }
    }
}
const executeCallbacks = (eventName: string) => {
    if (callbacks.hasOwnProperty(eventName)) {
        callbacks["close"].map(callback => {
            console.log(`[INFO]为${eventName}事件执行${callback.name}回调`)
            callback.callback()
        })
    }
}
//没写完
export const sendCommand = (object: object) => {
    ws.send(JSON.stringify(object))
}
export const sendMessage = <T extends string | ArrayBufferLike | Blob | ArrayBufferView>(data: T) => {
    ws.send(data)
}
export const sendMessageAndGetResult = async <T extends string | ArrayBufferLike | Blob | ArrayBufferView>(data: T) => {
    ws.send(data)
}