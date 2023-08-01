<template>
    <a-table :columns="columns" :data="props.playerList" :pagination="false">
        <template #side="{ record }">
            <a-select v-if="props.isOwner || props.username == record.username" v-model="record.side"
                @change="tryChangePlayerCombatSettings(record)">
                <a-option v-for="sideOption of sideOptions" :label="sideOption.label" :value="sideOption.value" />
            </a-select>
            <div v-else>{{ getLabel(record.side, sideOptions) }}</div>
        </template>
        <template #color="{ record }">
            <a-select v-if="props.isOwner || props.username == record.username" v-model="record.color"
                @change="tryChangePlayerCombatSettings(record)">
                <a-option v-for="colorOption of colorOptions" :label="colorOption.label" :value="colorOption.value" />
            </a-select>
            <div v-else>{{ getLabel(record.color, colorOptions) }}</div>
        </template>
        <template #team="{ record }">
            <a-select v-if="props.isOwner || props.username == record.username" v-model="record.team"
                @change="tryChangePlayerCombatSettings(record)">
                <a-option v-for="teamOption of teamOptions" :label="teamOption.label" :value="teamOption.value" />
            </a-select>
            <div v-else>{{ getLabel(record.team, teamOptions) }}</div>
        </template>
        <template #location="{ record }">
            <a-select v-if="props.isOwner || props.username == record.username" v-model="record.location"
                @change="tryChangePlayerCombatSettings(record)">
                <a-option v-for="locationOption of locationOptions" :label="locationOption.label"
                    :value="locationOption.value" />
            </a-select>
            <div v-else>{{ getLabel(record.location, locationOptions) }}</div>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { PlayerInRoom } from '@/api/websocket/room'
import { useLobbyStore } from '@/store/lobby'
import { registerCallback, unregisterCallback } from '@/api/websocket'
import { changePlayerCombatSettings, sideOptions, colorOptions, teamOptions, locationOptions } from '@/api/websocket/room'
const lobbyStore = useLobbyStore()
const props = defineProps<{
    playerList: PlayerInRoom[],
    isOwner: Boolean,
    username: string
}>()
// //机器人位的数量
// const botSlotAccount = computed(() => {
//     return 8 - props.playerList.length
// })
const getLabel = (value: any, options: { label: string, value: any }[]) => {
    console.log("getting label for", value, "from", options)
    return options.filter(option => option.value == value)[0].label
}
const columns = [{
    title: '用户',
    dataIndex: 'username',
    slotName: 'username'
}, {
    title: '阵营',
    dataIndex: 'side',
    slotName: 'side'
}, {
    title: '颜色',
    dataIndex: 'color',
    slotName: 'color'
}, {
    title: '队伍',
    dataIndex: 'team',
    slotName: 'team'
}, {
    title: '位置',
    dataIndex: 'location',
    slotName: 'location'
}]
const tryChangePlayerCombatSettings = async (playerInRoom: any) => {//arco的组件可以直接把被改变的表格行对应的对象传进来，在这里也就是PlayerInRoom对象
    if (lobbyStore.currentRoom == undefined) {
        return 0 as never
    }
    await changePlayerCombatSettings({ key: lobbyStore.currentRoom.key, player: playerInRoom })
}
onMounted(async () => {
    //收到玩家改变战斗设置的回调
    registerCallback("playerChangeCombatSettings", "roomplayerlist-playerChangeCombatSettings", (data: { key: number, player: PlayerInRoom }) => {
        console.log(`[INFO]房间${data.key}中有玩家战斗设置变更：`, data.player)
        //把currentRoom和Rooms都变掉
        let room = lobbyStore.rooms.get(data.key)
        if (room == undefined) { return 0 as never }
        for (let i = 0; i < room.players.length; i++) {//变更room
            if (room.players[i].username == data.player.username) {
                room.players[i] = data.player
                lobbyStore.currentRoom = room//变更currentRoom
                break
            }
        }

    })
})
onUnmounted(() => {
    unregisterCallback("playerChangeCombatSettings", "roomplayerlist-playerChangeCombatSettings")
})
</script>