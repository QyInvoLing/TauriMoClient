import { ref } from 'vue'
import { defineStore } from 'pinia'
interface Room {//type不应该在这里被定义，以后再改，先实现功能
    key: number,
    roomname: string,
    map: string,
    mode: string,
    players: string[],
}
export const useLobbyStore = defineStore('lobby', () => {
    const roomlist = ref<Room[]>([])
    const isInRoom = ref(false)
    const currentRoom = ref<Room>({
        key: -2,
        roomname: 'test',
        map: '作用反作用',
        mode: '普通作战',
        players: ["player0", "player1"],
    })
    //测试用逻辑
    for (let i = 0; i < 50; i++) {
        roomlist.value.push({
            key: i,
            roomname: 'test',
            map: '作用反作用',
            mode: '普通作战',
            players: ["player0", "player1"],
        })
    }
    return { roomlist, isInRoom, currentRoom }
})