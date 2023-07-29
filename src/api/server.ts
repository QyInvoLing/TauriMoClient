export let host = "mo.qyinvoling.tech"

let storedHost = localStorage.getItem("host")
if (storedHost != null) {
    host = storedHost
}
export let server = `https://${host}`
export let webSocketServer = `wss://${host}`
export const temporallyChangeHost = (newHost: string) => {
    host = newHost
    server = `https://${host}`
    webSocketServer = `wss://${host}` 
}
export const saveHost = (newHost: string) => {
    temporallyChangeHost(newHost)
    localStorage.setItem("host", newHost)
}