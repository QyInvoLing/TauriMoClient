<template>
    <a-modal width="auto" v-model:visible="isJoinRoomModalOpen" title="输入密码" @ok="onPasswordInputComplete"
        :ok-loading="confirmButtonLoading">
        <a-input-password class="room-entry-modal__passowrd-input" placeholder="房间密码" v-model="roomPassword" allow-clear />
    </a-modal>
    <div class="roomlist-container">
        <a-table column-resizable :columns="columns" :pagination="false" :data="(roomsForDisplay as unknown as any)"
            :scroll="{ y: '100%' }" :scrollbar="true" @row-click="handleRowClick">
            <template #players="{ record }">
                <!-- 这里的record应该指的是data数组内的对象 -->
                <a-tooltip :content="record.players.map((player: any) => player.username).join('\n')">
                    <div>{{ record.players.length }}/8</div>
                </a-tooltip>
            </template>
        </a-table>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { registerCallback, unregisterCallback } from '@/api/websocket'
import { getRoomList, Room, enterRoom } from '@/api/websocket/room'
import { useLobbyStore } from '@/store/lobby'
import { useAccountStore } from '@/store/account'
import { Message } from '@arco-design/web-vue'
const emit = defineEmits<{
    (e: "enterRoom", roomKey: number): void,
    (e: "leaveRoom"): void
}>()
const lobbyStore = useLobbyStore()
const accountStore = useAccountStore()
const columns = [
    {
        title: '房间名',
        dataIndex: 'name',
        ellipsis: true,
        tooltip: true,
        width: 100
    },
    {
        title: '信息',
        children: [{
            title: '模式',
            dataIndex: 'mode',
            ellipsis: true,
            width: 100,
        }, {
            title: '地图',
            dataIndex: 'map',
            width: 100
        },
        {
            title: '金钱',
            dataIndex: 'credits',
            ellipsis: true,
            width: 100,
        }]
    }
    ,
    {
        title: "玩家",
        slotName: "players",
        width: 50,
    }

]
const roomsForDisplay = computed(() => {
    return Array.from(lobbyStore.rooms.values()).map(room => {
        return { ...room.settings, ...room }
    })
})
//双击判断逻辑
let roomIdTimerCache: number = -1
let enterRoomTimer: number = -1
const handleRowClick = (tableRow: any) => {
    let room = tableRow as Room//Arco的table对类型有严格要求，暂时没时间好好搞
    if (!lobbyStore.isInRoom) {//不在房间里才行
        //不管怎么样都要重置定时器
        clearTimeout(enterRoomTimer)
        enterRoomTimer = setTimeout(() => {//设置一个定时器，清空本次点击房间的记录
            roomIdTimerCache = -1
        }, 1000) as unknown as number//不会在nodejs中运行，所以无所谓。
        if (roomIdTimerCache != room.key) {//上一次点击点的不是这个房间
            roomIdTimerCache = room.key//那就记住现在点的是哪个房间

        } else {//上次也点的这个，那么就进房间
            tryEnterRoom(room)
        }
    }
}
const isJoinRoomModalOpen = ref(false)
const roomPassword = ref("")
const confirmButtonLoading = ref(false)
const openPasswordInputModal = () => {
    isJoinRoomModalOpen.value = true
}
let roomIdCache: number = -1//这里不能用roomIdTimerCache，因为打开输密码面板后一秒它会被重置
const tryEnterRoom = async (room: Room) => {
    console.log("[INFO]在房间列表组件内试图进入房间", room.key)
    if (room.private) {//有密码的就打开面板
        openPasswordInputModal()
        roomIdCache = room.key
    } else {//没密码直接进
        confirmEnterRoom(roomIdTimerCache)
    }

}
const onPasswordInputComplete = async () => {
    confirmButtonLoading.value = true
    await confirmEnterRoom(roomIdCache, roomPassword.value)

    roomPassword.value = ""
}
const confirmEnterRoom = async (key: number, password: string = "") => {
    console.log("[INFO]信息齐全，开始尝试进入房间", key)
    let enterResult = await enterRoom({ key: key, password })
    if (enterResult.result == "success") {
        emit("enterRoom", key)
    } else {
        if (enterResult.message == "wrong_password") {
            Message.error({
                content: '密码错误'
            })
        } else if (enterResult.message == "room_not_exist") {
            Message.error({
                content: '房间已不存在'
            })
        }
    }
    confirmButtonLoading.value = false
}
onMounted(async () => {
    //获取初始房间列表
    let { rooms } = await getRoomList()
    for(const key in rooms){
        if(rooms.hasOwnProperty(key)){
            lobbyStore.rooms.set(Number(key),rooms[key])
        }
    }
    // lobbyStore.rooms = rooms
    console.log("[INFO]初始房间列表：", rooms)
    //收到房间创建消息时的回调
    registerCallback("roomCreated", "roomCreated", (data: { room: Room }) => {
        console.log(`[INFO]新的房间：`, data.room)
        lobbyStore.rooms.set(data.room.key, data.room)
    })
    //收到房间销毁消息时的回调
    registerCallback("roomDestroyed", "roomDestroyed", (data: { room: Room }) => {
        console.log(`[INFO]房间${data.room}销毁.`)
        //如果这个房间是自己现在的房间，就设置客户端的房间状态
        if (data.room.key === lobbyStore.currentRoom?.key ) {
            emit("leaveRoom")
            if(accountStore.username !== data.room.players[0].username){//房主不是自己才需要提示
                Message.info({
                content: '房主销毁了房间'
            })
            }
            
        }

        //一定要对比key才行，之前这里直接用indexOf出错了，我是傻逼
        lobbyStore.rooms.delete(data.room.key)
    })
    //收到玩家进房消息时的回调
    registerCallback("playerJoinRoom", "roomlist-playerJoinRoom", (data: { room: Room, player: string }) => {
        console.log(`[INFO]用户${data.player}进入房间${data.room.key}`)
        let room = lobbyStore.rooms.get(data.room.key)
        room?.players.push({ username: data.player, color: -1, team: 0, location: 0 })
    })
    //收到玩家退房消息时的回调
    registerCallback("playerLeaveRoom", "roomlist-playerLeaveRoom", (data: { room: Room, player: string }) => {
        console.log(`[INFO]用户${data.player}退出房间${data.room.key}`)
        let room = lobbyStore.rooms.get(data.room.key)
        if (room === undefined) { return }
        room.players = room.players.filter(player => player.username !== data.player)
    })
})
onUnmounted(() => {
    unregisterCallback("roomCreated", "roomCreated")
    unregisterCallback("roomDestroyed", "roomDestroyed")
    unregisterCallback("playerJoinRoom", "roomlist-playerJoinRoom")
    unregisterCallback("playerLeaveRoom", "roomlist-playerLeaveRoom")
})
</script>
<style scoped>
.roomlist-container {
    height: 70vh;
}

.room-entry-modal {
    width: 18rem;
}

.room-entry-modal__passowrd-input {
    width: 15rem;
}
</style>@/store/lobby