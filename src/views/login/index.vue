<!--
 * @Author: QyInvoLing
 * @Date: 2023-07-26 17:29:08
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-27 11:20:55
 * @FilePath: \tauri-mo-client\src\views\login\index.vue
 * @Description: 
-->
<template>
    <div class="login-form-wrapper">
        <!-- <div class="login-form-title">{{ "登录" }}</div> -->
        <a-spin :size="32" tip="Soooooon!" :loading="loading">
            <a-form :model="userInfo" class="login-form" @submit="handleSubmit">
                <a-form-item field="username" label="用户名" :rules="usernameRule" :validate-trigger="['change', 'blur']"
                    hide-label>
                    <a-input :placeholder="'用户名'" v-model="userInfo.username">
                        <template #prefix>
                            <icon-user />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item field="password" label="密码" :rules="passwordRule" :validate-trigger="['change', 'blur']"
                    hide-label>

                    <a-input-password :placeholder="'密码'" v-model="userInfo.password" allow-clear>
                        <template #prefix>
                            <icon-lock />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-space :size="16" direction="vertical">
                    <!-- <div class="login-form-password-actions">
                        <a-checkbox checked="rememberPassword">
                            记住密码
                        </a-checkbox>
                        <a-link></a-link>
                    </div> -->
                    <a-button type="primary" html-type="submit" long>
                        登录
                    </a-button>
                    <a-button type="text" @click="redirectToRegisterPage" long class="login-form-register-btn">
                        注册
                    </a-button>
                </a-space>
            </a-form>
        </a-spin>
    </div>
</template>
  
<script lang="ts" setup>
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
import { ref, onMounted } from 'vue'
// import { invoke } from '@tauri-apps/api'
import { Message } from '@arco-design/web-vue'
import { useAccountStore } from '@/store/account'
import { sleep } from '@/utils/utils'
import router from '@/router/router'
import { login } from './api'
import { changeWindowSize, setResizeable } from '@/api/window'
import { connect } from '@/api/websocket'
import { usernameRegex, usernameRule, passwordRule } from '@/api/loginAndRegister'
const accountStore = useAccountStore()
const userInfo = ref({ username: "", password: "" })
const loading = ref(false)
const handleSubmit = async () => {
    //校验表单是否合法
    if (userInfo.value.password.length < 8 || userInfo.value.password.length > 16
        || userInfo.value.username.length < 5 || userInfo.value.username.length > 16
        || userInfo.value.username.match(usernameRegex) === null) {
        Message.error({
            content: '请输入合法的用户名和密码'
        })
        return
    }
    loading.value = true
    //来不及写，以后再说，先用anyscript写一大堆登录&初始化逻辑
    try {
        let loginResponse = await login(userInfo.value.username, userInfo.value.password) as unknown as Record<string, any>

        if (loginResponse.data.result == "success") {
            localStorage.setItem("username", userInfo.value.username)
            localStorage.setItem("password", userInfo.value.password)
            accountStore.jwt = loginResponse.data.jwt
            accountStore.username = userInfo.value.username
            await connect(accountStore.jwt)
            loading.value = false
            Message.success({
                content: '登录成功'
            })
            await redirectToLobby()
        } else {
            Message.error({
                content: '登录失败:' + loginResponse.data.message
            })
        }
    } catch (e) {
        loading.value = false
        console.error(e)
        Message.error({
            content: '登录失败:无法连接到服务器'
        })
        return
    }
}
const redirectToLobby = async () => {
    //允许界面自由拉伸，然后进入大厅
    setResizeable(true)
    await sleep(1000)
    router.replace({ name: 'lobby' })
}
const redirectToRegisterPage = async () => {
    router.replace({ name: 'register' })
}
// const clickRegisterButton = () => {
//     invoke('greet', { name: 'World' })
//         // `invoke` 返回的是一个 Promise
//         .then((response) => console.log(response))
// }




onMounted(() => {
    console.log("[INFO]登录页面挂载.")
    changeWindowSize(400, 500, false)//和tauri.config.json一致，而且是logical size
    setResizeable(false)
    const localUsername = localStorage.getItem("username")
    const localPassword = localStorage.getItem("password")
    userInfo.value.username = localUsername == null ? "" : localUsername
    userInfo.value.password = localPassword == null ? "" : localPassword
})
</script>
  
<style scoped>
.login-form {
    width: 80vw;
    margin-top: 10vh;
    margin-left: 10vw;
}
</style>
  @/api/websocket/websocket