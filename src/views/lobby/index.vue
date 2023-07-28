<template>
    <a-tabs :animation="true" v-model:active-key="currentTabIndex" class="lobby-tabs">
        <template #extra>
            <a-button @click="manuallyLeaveLobby">退出大厅</a-button>
        </template>
        <a-tab-pane key="1" title="大厅">
            <a-layout class="lobby-container">
                <a-layout-header>大厅</a-layout-header>
                <a-layout>
                    <a-layout-content>
                        <roomlist @enter-room="enterRoom" />
                    </a-layout-content>
                    <a-layout-sider>
                        <friends />
                        <playerlist />
                    </a-layout-sider>
                </a-layout>
                <a-layout-footer>
                    <chat />
                </a-layout-footer>
            </a-layout>
        </a-tab-pane>
        <a-tab-pane key="2" :disabled="!lobbyStore.isInRoom" title="房间">
            <room @leave-room="backToLobby" />
        </a-tab-pane>
    </a-tabs>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import chat from "./components/chat.vue"
import friends from "./components/friends.vue"
import playerlist from "./components/playerlist.vue"
import roomlist from "./components/roomlist.vue"
import room from "./components/room.vue"
import { changeWindowSize } from "@/api/window"
import { debounce } from "@/utils/utils"
import { useLobbyStore } from '@/store/lobby'
import { useAccountStore } from '@/store/account'
import { registerCallback, disconnect, unregisterCallback } from '@/api/websocket'
import { getPlayerList } from '@/api/websocket/player'
import router from '@/router/router'
import { appWindow } from "@tauri-apps/api/window"
import { Message } from '@arco-design/web-vue'
const accountStore = useAccountStore()
const lobbyStore = useLobbyStore()
const currentTabIndex = ref("1")
//房间内点击退出房间，做完状态清理之后，让父组件切回大厅
const backToLobby = () => {
    currentTabIndex.value = "1"
}
const enterRoom = () => {
    currentTabIndex.value = "2"
}
//在右上角点击离开大厅，则不触发掉线提示。
//先取消回调注册，然后断开连接并返回登录页面
const manuallyLeaveLobby = () => {
    unregisterCallback("close", "leaveLobbyOnWebSocketClose")
    disconnect()
    leaveLobby()
}
//websocket断开时的回调
const leaveLobbyOnWebSocketClose = () => {
    Message.error({
        content: '哎呀,掉线了'
    })
    leaveLobby()
}
//大厅内退出，返回到登录页面
const leaveLobby = async () => {
    //清空窗口大小变化的事件监听器
    await sizeChangeListener.then((unlistenFunction) => unlistenFunction())
    //断开websocket连接
    //清空store内房间和玩家
    lobbyStore.players = []
    lobbyStore.isInRoom = false
    lobbyStore.roomlist = []
    //清空store内账号
    accountStore.username = ""
    accountStore.jwt = ""
    //回登录页
    router.replace({ name: "login" })
}
//窗口大小变化时，存进缓存。下次进入大厅直接恢复
const debouncedSizeChangeListener = debounce((size: any) => {
    console.log("窗口大小变化：", size)
    localStorage.setItem("width", size.width)
    localStorage.setItem("height", size.height)
}, 300)
let sizeChangeListener = appWindow.onResized(({ payload: size }) => {
    debouncedSizeChangeListener(size)
})
onMounted(async () => {
    await changeWindowSize(localStorage.getItem("width"), localStorage.getItem("height"))
    // 注册断开WebSocket连接的回调
    registerCallback("close", "leaveLobbyOnWebSocketClose", leaveLobbyOnWebSocketClose)

    //玩家列表
    let { players } = await getPlayerList()
    lobbyStore.players.push(...players)
    console.log("[INFO]初始玩家列表：", players)

})
onUnmounted(() => {
    unregisterCallback("close", "leaveLobbyOnWebSocketClose")
})
</script>
<style scoped>
.lobby-tabs {
    width: 100%;
    height: 100%;
}

.lobby-container {
    width: 100%;
    height: 100%;
}
</style>@/api/websocket/websocket