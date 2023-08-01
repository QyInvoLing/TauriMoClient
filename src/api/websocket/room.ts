import { sendRpcMessage } from "@/api/websocket"

//封装房间相关的api
//创建房间
interface createRoomRequest {
    name: string,
    password: string
}
export const createRoom = async (request: createRoomRequest) => {
    return await sendRpcMessage("createRoom", request) as {
        result: string,
        key?: number
    }
}
//进入房间
interface enterRoomRequest {
    key: number,
    password: string
}
export const enterRoom = async (request: enterRoomRequest) => {
    return await sendRpcMessage("enterRoom", request) as { result: "success" | "error", message?: "wrong_password" | "room_not_exist" }
}

//退出房间
interface leaveRoomRequest {
    key: number,
}
export const leaveRoom = async (request: leaveRoomRequest) => {
    return await sendRpcMessage("leaveRoom", request) as { result: string }
}
//修改房间设置
//在房间内更改用户战斗相关设置
interface changePlayerCombatSettingsRequest {
    key: number,
    player:PlayerInRoom
}
export const changePlayerCombatSettings = async (request:changePlayerCombatSettingsRequest)=>{
    return await sendRpcMessage("changePlayerCombatSettings", request) as { result: string }
}
//获取房间列表
export const getRoomList = async () => {
    return await sendRpcMessage("getRoomList") as { result: string, rooms: Record<number, Room> }
}

/**
 * 注意，这些内容应该是从游戏文件夹读取的，但是现在我暂时不想写
 * 
 * 所以临时写死逻辑
 */

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
export interface PlayerInRoom {
    username: string
    side: Side
    color: Color
    team: TeamOption
    location: Location

}
enum Credits {
    C5000 = 5000, C10000 = 10000, C20000 = 20000, C30000 = 30000, C40000 = 40000, C50000 = 50000
}
enum TechLevel {
    T4 = 4, T5 = 5, T6 = 6, T7 = 7, T8 = 8, T9 = 9, T10 = 10
}
enum Color {//这不是我猜的，以后可能要改成从文件里读取
    Random = -1, Teal = 0, Red = 1, Aqua = 2, Lime = 3, Purple = 4, Yellow = 5, Blue = 6, Orange = 7, Magenta = 8, Brown = 9, Green = 10, Crimson = 11, Sky = 12
}
enum TeamOption {//1234代表ABCD，0代表无。我猜的，以后还可能改
    NoTeam = 0, A = 1, B = 2, C = 3, D = 4
}
enum Location {//0代表随机位，1-8代表地图上的位置。我猜的，以后还可能改
    Random = 0, Position1 = 1, Position2 = 2, Position3 = 3, Position4 = 4, Position5 = 5, Position6 = 6, Position7 = 7, Position8 = 8
}
enum Side {//-1随机，从零（美国）开始
    Observer = -2, Random = -1, US = 0, EA = 1, PF = 2, RU = 3, LC = 4, CN = 5, PC = 6, SC = 7, HQ = 8, HH = 9, WC = 10, LB = 11
}
export const sideOptions = [{
    label: "观察者",
    value: -2
}, {
    label: "随机阵营",
    value: -1
}, {
    label: "US",
    value: 0
}, {
    label: "EA",
    value: 1
}, {
    label: "PF",
    value: 2
}, {
    label: "RU",
    value: 3
}, {
    label: "LC",
    value: 4
}, {
    label: "CN",
    value: 5
}, {
    label: "PC",
    value: 6
}, {
    label: "SC",
    value: 7
}, {
    label: "HQ",
    value: 8
}, {
    label: "HH",
    value: 9
}, {
    label: "WC",
    value: 10
}, {
    label: "LB",
    value: 11
}
]
export const colorOptions = [{
    label: "随机颜色",
    value: -1
}, {
    label: "墨绿色",
    value: 0
}, {
    label: "红色",
    value: 1
}, {
    label: "青色",
    value: 2
}, {
    label: "浅绿色",
    value: 3
}, {
    label: "紫色",
    value: 4
}, {
    label: "黄色",
    value: 5
}, {
    label: "蓝色",
    value: 6
}, {
    label: "橙色",
    value: 7
}, {
    label: "紫红色",
    value: 8
}, {
    label: "棕色",
    value: 9
}, {
    label: "绿色",
    value: 10
}, {
    label: "深红色",
    value: 11
}, {
    label: "天蓝色",
    value: 12
}
]

export const teamOptions = [{
    label: "无",
    value: 0
}, {
    label: "A",
    value: 1
}, {
    label: "B",
    value: 2
}, {
    label: "C",
    value: 3
}, {
    label: "D",
    value: 4
}
]
export const locationOptions = [{
    label: "随机位置",
    value: 0
}, {
    label: "1",
    value: 1
}, {
    label: "2",
    value: 2
}, {
    label: "3",
    value: 3
}, {
    label: "4",
    value: 4
}, {
    label: "5",
    value: 5
}, {
    label: "6",
    value: 6
}, {
    label: "7",
    value: 7
}, {
    label: "8",
    value: 8
}
]