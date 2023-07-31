<template>
    <a-space direction="vertical" class="room-create-menu-slot-container">
        <a-input placeholder="房间名" v-model="roomName" :max-length="20" allow-clear show-word-limit />
        <a-input-password placeholder="房间密码" v-model="roomPassword" allow-clear />
        <a-button type="primary" :loading="loading" @click="clickCreateRoomButton" long>
            创建
        </a-button>
    </a-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createRoom } from '@/api/websocket/room'
// import { registerCallback } from '@/api/websocket'
import { Message } from '@arco-design/web-vue'
import { useAccountStore } from '@/store/account'
const accountStore = useAccountStore()
const roomName = ref(`${accountStore.username} 的房间`)
const roomPassword = ref("")
const loading = ref(false)
const emit = defineEmits<{
    (e: "enterRoom", roomKey: number): void
}>()
const clickCreateRoomButton = async () => {
    if (roomName.value == "") {
        return Message.error({
            content: '请输入房间名!'
        })
    }
    loading.value = true
    let createRoomResult = await createRoom({ name: roomName.value, password: roomPassword.value })
    if (createRoomResult.result == "error" || createRoomResult.key == undefined) {//创建房间失败，弹个报错
        Message.error({
            content: '创建房间失败!'
        })
        loading.value = false
    } else {//成功了
        Message.success({
            content: '创建房间成功!'
        })
        loading.value = false
        //进房
        enterRoom(createRoomResult.key)

    }
}
const enterRoom = (key: number) => {
    console.log("[INFO]进入新创建的房间", key)

    emit("enterRoom", key)
}
</script>
<style scoped>
.room-create-menu-slot-container{
    width:12rem;
}
</style>