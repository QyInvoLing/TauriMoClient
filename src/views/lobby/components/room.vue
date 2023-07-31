<template>
    <div class="room-container">{{ lobbyStore.currentRoom }}<a-button @click="clickLeaveRoomButton">退出房间</a-button>
        <roomchat :room-key="lobbyStore.currentRoom?.key" />
    </div>
</template>
<script setup lang="ts">
import roomchat from './roomchat.vue'
import { useLobbyStore } from '@/store/lobby'
import { leaveRoom } from '@/api/websocket/room'
import { Message } from '@arco-design/web-vue'
const lobbyStore = useLobbyStore()
const emit = defineEmits(["leaveRoom"])
const clickLeaveRoomButton = async () => {
    if (!lobbyStore.currentRoom) {
        Message.error({//出错了，不可能的分支
            content: '客户端出错，请退出大厅重连'
        })
        return
    }
    //发送请求
    let leaveResult = await leaveRoom({ key: lobbyStore.currentRoom.key })
    if (leaveResult.result == "success") {
        //回到大厅标签页
        Message.success({
            content: '离开房间成功'
        })
        emit("leaveRoom")
    } else {
        Message.error({
            content: '离开房间失败'
        })
    }

}
</script>
<style scoped>
.room-container{
    height:90vh;
    width:100vw;
}
</style>