//import WebSocket from 'websocket'
import { webSocketServer } from '@/api/server'
let rpcId = 1//标识消息id，自增
const callbacks: Record<string, Callback[]> = {}
interface Callback {
    name: string
    callback: Function
}
let ws: WebSocket
//初始化连接
export const connect = (jwt: string) => {
    ws = new WebSocket(webSocketServer + "/ws")



    return new Promise((resolve, reject) => {
        const ping = () => { sendMessage("ping") }
        const pingTimer = setInterval(ping, 3000)
        ws.onopen = () => {// 连接建立后
            console.log("[INFO]WebSocket连接建立成功，开始鉴权.")
            ws.addEventListener("message", (event) => {
                let message = JSON.parse(event.data) as Message
                console.log("[INFO]收到服务端消息：", message)
                executeCallbacks(message.name, message.data)
            })
            sendMessage("auth", { jwt })//发送鉴权消息
            //心跳包，防止断开连接

            resolve(null)
        }
        ws.onclose = () => {//注册断开回调，以便于在连接断开时进行处理
            executeCallbacks("close")
            clearInterval(pingTimer)
            reject()
        }
    })
}
export const disconnect = () => {
    try {//开发过程中，在大厅里重载代码，这里会报错
        ws.close()
    } catch (_) { }
}
/**
 * 为WebSocket事件和其他自定义事件注册回调
 * 
 * close在WebSocket连接关闭时被调用
 * 
 * 在WebSocket接收到服务端发来的消息时，会触发消息name对应的回调
 * @param eventName
 * @param name 
 * @param callback 
 */
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
const executeCallbacks = (eventName: string, ...args: any[]) => {
    if (callbacks.hasOwnProperty(eventName)) {
        callbacks[eventName].map(callback => {
            console.log(`[INFO]为${eventName}事件执行${callback.name}回调`)
            callback.callback(...args)
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

export const sendMessage = (name: string, message: object = {}) => {
    ws.send(JSON.stringify({ name, data: message }))
}
export const sendRpcMessage = (name: string, message: object = {}) => {
    let messageId = rpcId
    rpcId += 1
    ws.send(JSON.stringify({ name, data: message, id: messageId }))
    return new Promise((resolve, reject) => {
        // 收到消息时，将Promise解决并传递接收到的消息
        const rpcHandler = (event: MessageEvent) => {
            let returnMessage = JSON.parse(event.data) as RpcMessage
            if (messageId == returnMessage.id) {
                console.info(`[INFO]Rpc消息${messageId}得到回应：`, returnMessage.data)
                ws.removeEventListener("message", rpcHandler)
                resolve(returnMessage.data)
            } else {
                console.info(`[INFO]Rpc消息${messageId}监听到了无关回应：${returnMessage.id}.`,)
            }
        }
        ws.addEventListener("message", rpcHandler)
        ws.onerror = (error) => {
            reject(error)
        }
        // 避免内存泄漏，在关闭连接时移除这个事件监听器
        registerCallback("close", `removeEventListener${messageId}`, () => { ws.removeEventListener("message", rpcHandler) })
    })
}
