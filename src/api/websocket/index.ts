//import WebSocket from 'websocket'
import { webSocketServer } from '@/api/server'

const callbacks: Record<string, Callback[]> = {}
interface Callback {
    name: string
    callback: Function
}
let ws: WebSocket
//初始化连接
export const connect = (jwt: string) => {
    ws = new WebSocket(webSocketServer + "/ws")
    ws.onopen = () => {// 连接建立后
        console.log("[INFO]WebSocket连接建立成功，开始鉴权.")
        ws.addEventListener("message", (event) => {
            console.log("[INFO]收到服务端消息：", event.data)
        })
        sendMessage({ name: "auth", data: { jwt } })//发送鉴权消息
    }
    const ping = ()=>{sendMessage({name:"ping",data:""})}
    const pingTimer = setInterval(ping, 3000)
    ws.onclose = () => {//注册断开回调，以便于在连接断开时进行处理
        executeCallbacks("close")
        clearInterval(pingTimer)
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
//触发某事件所有回调
const executeCallbacks = (eventName: string) => {
    if (callbacks.hasOwnProperty(eventName)) {
        callbacks["close"].map(callback => {
            console.log(`[INFO]为${eventName}事件执行${callback.name}回调`)
            callback.callback()
        })
    }
}
interface Message {
    name: string
    data: any
}
interface RpcMessage extends Message {
    id: number
}

//没写完

export const sendMessage = <T extends Message>(message: T) => {
    ws.send(JSON.stringify(message))
}
export const sendRpcMessage = <T extends RpcMessage>(message: T) => {
    ws.send(JSON.stringify(message))
    return new Promise((resolve, reject) => {
        // 收到消息时，将Promise解决并传递接收到的消息
        const rpcHandler = (event: MessageEvent<RpcMessage>) => {
            if (message.id == event.data.id) {
                ws.removeEventListener("message", rpcHandler)
                resolve(event.data)
            }
        }
        ws.addEventListener("message", rpcHandler)
        ws.onerror = (error) => {
            reject(error)
        }
        // 避免内存泄漏
        ws.onclose = () => {
            ws.removeEventListener("message", rpcHandler)
        }
    })
}
