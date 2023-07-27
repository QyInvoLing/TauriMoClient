<template>
    {{ store.currentRoom }}
    <a-button  @click="leaveRoom">退出房间</a-button>
</template>
<script setup lang="ts">
import { useLobbyStore } from '@/store/lobby'
const store = useLobbyStore()
const emit = defineEmits(["leaveRoom"])
const leaveRoom = ()=>{
    //发送请求
    //清理状态
    store.isInRoom = false
    //回到大厅标签页
    emit("leaveRoom")
}
</script>
<style scoped></style>