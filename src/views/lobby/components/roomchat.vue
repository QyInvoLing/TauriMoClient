<template>
    <div class="room-chat-container">

        <div ref="messageDisplayer" class="room-chat-message-displayer">
            <a-empty v-if="messages.length == 0" class="room-chat-detail-empty">暂无消息</a-empty>
            <p v-for="message in messages">[{{ message.formattedtime }}]{{ message.username }}:{{
                message.message
            }}</p>
        </div>
        <a-input class="room-chat-input" placeholder="房间聊天" v-model="userInput" @press-enter="onPressEnter"
            :max-length="100" allow-clear show-word-limit />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { registerCallback, unregisterCallback } from '@/api/websocket'
import { sendRoomChatMessage } from '@/api/websocket/chat'
import { getTimeString } from '@/utils/utils'
import { useAccountStore } from '@/store/account'
const props = defineProps({
    roomKey: Number
})
const accountStore = useAccountStore()
interface Message {
    username: string
    message: string
}
interface MessageWithTime extends Message {
    formattedtime: string
}
const messages = ref<MessageWithTime[]>([])
const userInput = ref("")
//发送非空消息，清空输入框
const onPressEnter = () => {
    if (props.roomKey == undefined) { return }
    if (userInput.value !== '') {
        sendRoomChatMessage(userInput.value, props.roomKey)
        userInput.value = ''
    }


}

const messageDisplayer = ref<HTMLDivElement | null>(null)
const scrollToBottom = () => {
    if (messageDisplayer.value) {
        messageDisplayer.value.scrollTop = messageDisplayer.value.scrollHeight - messageDisplayer.value.clientHeight;
    }
}
onMounted(() => {
    messages.value=[]
    registerCallback("roomChat", "roomChat", async (message: Message) => {
        let messageWithTime: MessageWithTime = { ...message, formattedtime: getTimeString() }
        messages.value.push(messageWithTime)
        if (accountStore.username == message.username) {
            //收到了自己发的消息，在dom更新后（消息渲染出来）就拉到最下方
            await nextTick()
            scrollToBottom()
        }
    })
})
onUnmounted(() => {
    unregisterCallback("roomChat", "roomChat")
})
</script>
<style scoped>
.room-chat-container {
    width: 40%;
    height: 20vh;
    position:relative;
}

.room-chat-message-displayer {
    height: 90%;
    overflow: auto;
}

.room-chat-detail-empty {
    width:100%;
    position: absolute;
    top: 10%;
    margin:auto;
}
</style>