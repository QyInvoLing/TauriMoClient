import { sendRpcMessage } from "@/api/websocket"
interface playerlistResult {
    result: string,
    players: string[]
}
//封装玩家相关的api
export const getPlayerList = async () => {
    return await sendRpcMessage("getPlayerList") as playerlistResult
}