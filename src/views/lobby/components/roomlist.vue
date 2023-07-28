<template>
    <div class="roomlist-container">
        <a-table :columns="columns" :pagination="false" :data="lobbyStore.roomlist" :scroll="{ y: '100%' }"
            :scrollbar="true" @row-click="handleRowClick">
            <template #players="{ record }">
                <!-- 这里的record应该指的是data数组内的对象 -->
                <a-tooltip :content="record.players.join('\n')">
                    <div>{{ record.players.length }}/8</div>
                </a-tooltip>
            </template>
        </a-table>
    </div>
</template>
<script setup lang="ts">
import { useLobbyStore } from '@/store/lobby'
const emit = defineEmits(["enterRoom"])
const lobbyStore = useLobbyStore()
const columns = [
    {
        title: '房间名',
        dataIndex: 'roomname',
        ellipsis: true,
        tooltip: true,
        width: 100
    },
    {
        title: '地图',
        dataIndex: 'map',
        width: 100
    },
    {
        title: '模式',
        dataIndex: 'mode',
        ellipsis: true,
        width: 100,
    },

    {
        title: "人数",
        slotName: "players",
        width: 50,
    }

]
let roomIdCache: number = -1
let enterRoomTimer: number = -1
const handleRowClick = (room: any) => {
    if (!lobbyStore.isInRoom) {//不在房间里才行
        //不管怎么样都要重置定时器
        clearTimeout(enterRoomTimer)
        if (roomIdCache != room.key) {//上一次点击点的不是这个房间
            roomIdCache = room.key//那就记住现在点的是哪个房间
            enterRoomTimer = setTimeout(() => {//设置一个定时器，清空本次点击房间的记录
                roomIdCache = -1
            }, 1000) as unknown as number//不会在nodejs中运行，所以无所谓。
        } else {//上次也点的这个，那么就进房间
            enterRoom(room)
        }
    }


}
const enterRoom = (room: any) => {
    console.log("进入房间", room)
    //发送请求
    //更新状态
    lobbyStore.currentRoom = room
    lobbyStore.isInRoom = true
    emit("enterRoom")
}
</script>
<style scoped>
.roomlist-container {
    height: 70vh;
}
</style>@/store/lobby