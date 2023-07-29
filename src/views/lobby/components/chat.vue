<template>
    <div class="lobby-chat-container">
        <a-popover title="大厅聊天" trigger="click">
            <div class="lobby-chat-preview">


                <a-card hoverable>
                    <div class="lobby-chat-preview-card-content" >
                        <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                            <a-avatar :style="{ marginRight: '8px', backgroundColor: '#b0b0b0' }" :size="28">
                                <icon-message color="#000" />
                            </a-avatar>
                            <a-typography-text :size="16">{{ lastMessage }}</a-typography-text>
                        </span>
                    </div>
                </a-card>
            </div>


            <template #content>
                <div class="lobby-chat-detail-container">

                    <div ref="messageDisplayer" class="lobby-chat-message-displayer">
                        <a-empty v-if="messages.length == 0" class="lobby-chat-detail-empty">暂无消息</a-empty>
                        <p v-for="message in messages">[{{ message.formattedtime }}]{{ message.username }}:{{
                            message.message
                        }}</p>
                    </div>


                    <a-input class="lobby-chat-input" placeholder="大厅聊天" v-model="userInput" @press-enter="onPressEnter"
                        :max-length="100" allow-clear show-word-limit />
                </div>
            </template>
        </a-popover>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { registerCallback, unregisterCallback } from '@/api/websocket'
import { sendLobbyChatMessage } from '@/api/websocket/chat'
import { getTimeString } from '@/utils/utils'
import { useAccountStore } from '@/store/account'
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
    if (userInput.value !== '') {
        sendLobbyChatMessage(userInput.value)
        userInput.value = ''
    }


}
const lastMessage = computed(() => {
    if (messages.value.length == 0) {
        return "大厅聊天"
    } else {
        let message = messages.value[messages.value.length - 1]
        return `[${message.formattedtime}]${message.username}:${message.message}`
    }

})

const messageDisplayer = ref<HTMLDivElement | null>(null)
const scrollToBottom = () => {
    if (messageDisplayer.value) {
        messageDisplayer.value.scrollTop = messageDisplayer.value.scrollHeight - messageDisplayer.value.clientHeight;
    }
}
onMounted(() => {
    registerCallback("lobbyChat", "lobbyChat", async (message: Message) => {
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

.lobby-chat-detail-container {
    width: 70vw;
    height: 60vh;
}

.lobby-chat-message-displayer {
    height: 90%;
    overflow: auto;
}

.lobby-chat-detail-empty {
    position: absolute;
    top: 20%;
}

.lobby-chat-preview-card-content {

    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden
}
</style>