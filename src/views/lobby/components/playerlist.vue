<template>
    <div class="playerlist-container">
        <a-list :max-height="'100%'" :scroll="scrollbarOptions" :scrollbar="true">
            <template #header>
                <a-statistic title="在线用户" :value="lobbyStore.players.length" show-group-separator />
            </template>
            <a-list-item v-for="player in lobbyStore.players">{{ player }}</a-list-item>
        </a-list>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { registerCallback, unregisterCallback } from '@/api/websocket';
import { useLobbyStore } from '@/store/lobby'
import { getPlayerList } from '@/api/websocket/player'
const lobbyStore = useLobbyStore()
const scrollbarOptions = {
    y: "100%"
}
onMounted(async() => {
    //获取初始玩家列表
    let { players } = await getPlayerList()
    lobbyStore.players = []
    lobbyStore.players.push(...players)
    console.log("[INFO]初始玩家列表：", players)
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