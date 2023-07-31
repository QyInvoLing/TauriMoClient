import { sendRpcMessage } from "@/api/websocket"

export interface Room {//type不应该在这里被定义，以后再改，先实现功能
    key: number,
    name: string,
    private: boolean,
    players: PlayerInRoom[],
    settings: {
        map: string,
        mode: string,
        credits: Credits,
        techlevel: TechLevel
    }
}
enum Credits {
    C5000 = 5000, C10000 = 10000, C20000 = 20000, C30000 = 30000, C40000 = 40000, C50000 = 50000
}
enum TechLevel {
    T4 = 4, T5 = 5, T6 = 6, T7 = 7, T8 = 8, T9 = 9, T10 = 10
}
enum Color {//这不是我猜的，以后可能要改成从文件里读取
    Random=-1,Teal = 0, Red = 1, Aqua = 2, Lime = 3, Purple = 4, Yellow = 5, Blue = 6, Orange = 7, Magenta = 8, Brown = 9, Green = 10, Crimson = 11, Sky = 12
}
enum TeamOption {//1234代表ABCD，0代表无。我猜的，以后还可能改
    NoTeam = 0, A = 1, B = 2, C = 3, D = 4
}
enum Location {//0代表随机位，1-8代表地图上的位置。我猜的，以后还可能改
    Random = 0, Position1 = 1, Position2 = 2, Position3 = 3, Position4 = 4, Position5 = 5, Position6 = 6, Position7 = 7, Position8 = 8
}
interface PlayerInRoom {
    username: string,
    color: Color,
    team: TeamOption
    location: Location

}
//封装房间相关的api
interface createRoomRequest {
    name: string,
    password: string
}
interface createRoomResult {
    result: string,
    key?: number
}
export const createRoom = async (request: createRoomRequest) => {
    return await sendRpcMessage("createRoom", request) as createRoomResult
}
interface enterRoomRequest {
    key: number,
    password: string
}
export const enterRoom = async (request: enterRoomRequest) => {
    return await sendRpcMessage("enterRoom", request) as { result: "success" | "error", message?: "wrong_password" | "room_not_exist" }
}
interface leaveRoomRequest {
    key: number,
}
export const leaveRoom = async (request: leaveRoomRequest) => {
    return await sendRpcMessage("leaveRoom", request) as { result: string }
}


//获取房间列表
export const getRoomList = async () => {
    return await sendRpcMessage("getRoomList") as { result: string, rooms: Room[] }
}