<template>
    <div class="room-container">{{ lobbyStore.currentRoom }}<a-button @click="clickLeaveRoomButton">退出房间</a-button>
        <roomchat :room-key="lobbyStore.currentRoom?.key" />
        <roominfo :is-owner="isOwner"  />
        <roomplayerlist :username="accountStore.username" :is-owner="isOwner" :player-list="lobbyStore.currentRoom == undefined ? [] : lobbyStore.currentRoom?.players" />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import roominfo from './roominfo.vue'
import roomchat from './roomchat.vue'
import roomplayerlist from './roomplayerlist.vue'
import { useAccountStore } from '@/store/account'
import { useLobbyStore } from '@/store/lobby'
import { leaveRoom } from '@/api/websocket/room'
import { Message } from '@arco-design/web-vue'
const accountStore = useAccountStore()
const lobbyStore = useLobbyStore()

const isOwner = computed(() => {
    return lobbyStore.currentRoom?.players[0].username == accountStore.username
})
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
.room-container {
    height: 90vh;
    width: 100vw;
    overflow:auto;
}
</style>