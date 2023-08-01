import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Room } from "@/api/websocket/room"
export const useLobbyStore = defineStore('lobby', () => {
    const rooms = ref<Map<number, Room>>(new Map<number, Room>())
    const isInRoom = ref(false)
    const players = ref<string[]>([])
    const currentRoom = ref<Room>()
    return { players,  rooms, isInRoom, currentRoom }
})