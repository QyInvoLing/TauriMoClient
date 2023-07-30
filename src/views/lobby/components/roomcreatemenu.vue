<template>
    <a-space direction="vertical">
        <a-input placeholder="房间名" v-model="roomName" :max-length="10" allow-clear show-word-limit />
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
const roomName = ref("")
const roomPassword = ref("")
const loading = ref(false)
const clickCreateRoomButton = async () => {
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


    }
}
</script>
<style scoped></style>