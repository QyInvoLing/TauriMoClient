import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Room } from "@/api/websocket/room"
export const useLobbyStore = defineStore('lobby', () => {
    const roomlist = ref<Room[]>([])
    const isInRoom = ref(false)
    const players = ref<string[]>([])
    const currentRoom = ref<Room>()
    //测试用逻辑
    for (let i = 0; i < 50; i++) {
        roomlist.value.push({
            key: i,
            private: true,
            name: 'test',
            players: [{ username: "test", color: 0, team: 0, location: 0 }],
            settings: {
                map: '作用反作用',
                mode: '普通作战',
                credits: 5000,
                techlevel: 10
            }
        })
    }
    return { players, roomlist, isInRoom, currentRoom }
})