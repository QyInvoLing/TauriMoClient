<template>
    <!-- 不可编辑的 -->
    <a-descriptions v-if="!props.isOwner" title="作战设置">
        <a-descriptions-item v-for="item of roomSettings" :label="item.label">
            <a-tag>{{ item.value }}</a-tag>
        </a-descriptions-item>
    </a-descriptions>
    <div v-else>房主</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useLobbyStore } from '@/store/lobby'
const props = defineProps({
    isOwner: Boolean
})
const lobbyStore = useLobbyStore()
const roomSettings = computed(() => {
    if (lobbyStore.currentRoom === undefined) { return [] }
    return Object.entries(lobbyStore.currentRoom.settings).map(([key, value]) => ({ label: key, value }))
})
</script>