<template>
    <div class="playerlist-container">
        <a-list :max-height="'100%'" :scroll="scrollbarOptions" :scrollbar="true">
            <template #header>
                在线用户
            </template>
            <a-list-item v-for="player in lobbyStore.players">{{ player }}</a-list-item>
        </a-list>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { registerCallback, unregisterCallback } from '@/api/websocket';
import { useLobbyStore } from '@/store/lobby'
const lobbyStore = useLobbyStore()
const scrollbarOptions = {
    y: "100%"
}
onMounted(() => {
    registerCallback("playerLogin", "playerLogin", (message: { username: string }) => {
        console.log(`[INFO]用户${message.username}登录.`)
        lobbyStore.players.push(message.username)
    })
    registerCallback("playerLogout", "playerLogout", (message: { username: string }) => {
        console.log(`[INFO]用户${message.username}退出.`)
        lobbyStore.players.splice((lobbyStore.players.indexOf(message.username)),1)
    })
})
onUnmounted(() => {
    unregisterCallback("playerLogin", "playerLogin")
    unregisterCallback("playerLogout", "playerLogout")
})
</script>
<style scoped>
.playerlist-container {
    height: 70vh;
}
</style>