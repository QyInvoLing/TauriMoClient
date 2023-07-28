import { sendMessage } from "@/api/websocket"
interface playerlistResult {
    result: string,
    players: string[]
}
/**
 * 向服务端发送大厅聊天消息
 * @param lobbyChatMessage 消息字符串
 */
export const sendLobbyChatMessage = async (lobbyChatMessage: string) => {
    sendMessage("lobbyChat", { message: lobbyChatMessage })
}