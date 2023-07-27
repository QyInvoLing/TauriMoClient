<template>
    <a-tabs :animation="true" v-model:active-key="currentTabIndex" class="lobby-tabs">
        <template #extra>
            <a-button>退出 没做好</a-button>
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
        <a-tab-pane key="2" :disabled="!store.isInRoom" title="房间">
            <room @leave-room="backToLobby" />
        </a-tab-pane>
    </a-tabs>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import chat from "./components/chat.vue"
import friends from "./components/friends.vue"
import playerlist from "./components/playerlist.vue"
import roomlist from "./components/roomlist.vue"
import room from "./components/room.vue"
import { changeWindowSize } from "@/api/window"
import { debounce } from "@/utils/utils"
import { useLobbyStore } from '@/store/lobby'
import { onMounted } from 'vue'
import { appWindow } from "@tauri-apps/api/window";
const store = useLobbyStore()
const currentTabIndex = ref("1")
//房间内点击退出房间，做完状态清理之后，让父组件切回大厅
const backToLobby = () => {
    currentTabIndex.value = "1"
}
const enterRoom = () => {
    currentTabIndex.value = "2"
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
    changeWindowSize(localStorage.getItem("width"), localStorage.getItem("height"))
})
onUnmounted(() => {
    sizeChangeListener.then((unlistenFunction) => unlistenFunction())
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
</style>