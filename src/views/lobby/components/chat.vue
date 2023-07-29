<template>
    <div class="lobby-chat-container">
        <a-popover title="大厅聊天" trigger="click">
            <a-typography-paragraph class="lobby-chat-preview">
                {{ lastMessage.username }}:{{ lastMessage.message }}
            </a-typography-paragraph> 
            <template #content>
                <a-empty v-if="messages.length == 0">暂无消息</a-empty>
                <p v-for="message in messages">{{ message.username }}:{{ message.message }}</p>
                <a-input placeholder="大厅聊天" v-model="userInput" @press-enter="onPressEnter" :max-length="100" allow-clear
                    show-word-limit />
            </template>
        </a-popover>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { registerCallback, unregisterCallback } from '@/api/websocket'
import { sendLobbyChatMessage } from '@/api/websocket/chat'
interface Message {
    username: string
    message: string
}
const messages = ref<Message[]>([])
const userInput = ref("")
//发送消息，清空输入框
const onPressEnter = () => {
    sendLobbyChatMessage(userInput.value)
    userInput.value = ''
}
const lastMessage = computed(() => {
    if (messages.value.length == 0) {
        return { username: "", message: "" }
    } else {
        return messages.value[messages.value.length - 1]
    }

})
onMounted(() => {
    registerCallback("lobbyChat", "lobbyChat", (message: Message) => {
        messages.value.push(message)
    })
})
onUnmounted(() => {
    unregisterCallback("lobbyChat", "lobbyChat")
})
</script>
<style scoped>
.lobby-input {
    margin-top: 5px;
    margin-left: 5px;
}

.lobby-chat-container {
    width: 70%;
    height: 20vh;
}

.lobby-chat-preview {
    width: 100%;
    height: 100%;
}
</style>