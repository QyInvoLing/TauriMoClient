<template>
    <a-table :columns="columns" :data="playerList">

        <template #side="{ record }">
            <a-select v-model="record.side" @change="() => {  }">
                <a-option v-for="sideOption of sideOptions" :label="sideOption.label" :value="sideOption.value" /> 
            </a-select>
        </template>
        <template #color="{ record }">
            <a-select v-model="record.color" @change="() => {   }">
                <a-option v-for="colorOption of colorOptions" :label="colorOption.label" :value="colorOption.value" /> 
            </a-select>
        </template>
        
    </a-table>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { PlayerInRoom } from '@/api/websocket/room'
const props = defineProps<{
    playerList: PlayerInRoom[]
}>()
//机器人位的数量
const botSlotAccount = computed(() => {
    return 8 - props.playerList.length
})
const options = {
    Beijing: ['Haidian', 'Chaoyang', 'Changping'],
    Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
    Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
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
/**
 * 注意，这些内容应该是从游戏文件夹读取的，但是现在我暂时不想写
 * 
 * 所以临时写死逻辑
 */
const sideOptions = [ {
    label: "观察者",
    value: -2
}, {
    label: "随机阵营",
    value: -1
}, {
    label: "US",
    value: 0
}, {
    label: "EA",
    value: 1
}, {
    label: "PF",
    value: 2
}, {
    label: "RU",
    value: 3
}, {
    label: "LC",
    value: 4
}, {
    label: "CN",
    value: 5
}, {
    label: "PC",
    value: 6
}, {
    label: "SC",
    value: 7
}, {
    label: "HQ",
    value: 8
}, {
    label: "HH",
    value: 9
}, {
    label: "WC",
    value: 10
}, {
    label: "LB",
    value: 11
}
]
const colorOptions = [  {
    label: "随机颜色",
    value: -1
}, {
    label: "墨绿色",
    value: 0
}, {
    label: "红色",
    value: 1
}, {
    label: "青色",
    value: 2
}, {
    label: "浅绿色",
    value: 3
}, {
    label: "紫色",
    value: 4
}, {
    label: "黄色",
    value: 5
}, {
    label: "蓝色",
    value: 6
}, {
    label: "橙色",
    value: 7
}, {
    label: "紫红色",
    value: 8
}, {
    label: "棕色",
    value: 9
}, {
    label: "绿色",
    value: 10
}, {
    label: "深红色",
    value: 11
}, {
    label: "天蓝色",
    value: 12
}
]
 
const data = ref([{ username: "test", side: -1, color: -1, team: 0, location: 0 }])

</script>