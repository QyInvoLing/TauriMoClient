<template>
    <div class="lobby-chat-container">
        <a-input class="lobby-input" :style="{ width: '320px' }" placeholder="大厅聊天" :max-length="50" allow-clear show-word-limit />
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.lobby-input{
    margin-top:5px;
    margin-left:5px;
}
.lobby-chat-container{
    width:100%;
    height:100%;
}
</style>