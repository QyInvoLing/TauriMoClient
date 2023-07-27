import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useAccountStore = defineStore('account', () => {
    const jwt = ref("")
    const username = ref("")
    const password = ref("")
    const setUsername = (newUsername: string) => {
        username.value = newUsername
    }
    const setPassword = (newPassword: string) => {
        password.value = newPassword
    }

    return { jwt, username, password, setUsername, setPassword }
})