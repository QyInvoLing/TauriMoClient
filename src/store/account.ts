import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useAccountStore = defineStore('account', () => {
    const jwt = ref("")
    const username = ref("") 
    const setUsername = (newUsername: string) => {
        username.value = newUsername
    } 

    return { jwt, username, setUsername }
})