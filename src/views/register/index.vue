<template>
    <a-page-header @back="backToLogin" :style="{ background: 'var(--color-bg-2)' }" title="注册" :subtitle="host" />
    <div class="register-form-wrapper">
        <!-- <div class="login-form-title">{{ "登录" }}</div> -->
        <a-spin :size="32" tip="Soooooon!" :loading="loading">
            <a-form  :model="userInfo" class="register-form" @submit="handleSubmit">
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
                    <a-button type="primary" html-type="submit" long>
                        注册
                    </a-button>
                </a-space>
            </a-form>
        </a-spin>
    </div>
</template>
<script setup lang="ts">
import router from '@/router/router'
import { host } from '@/api/server'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { usernameRegex, usernameRule, passwordRule } from '@/api/loginAndRegister'
import { sleep } from "@/utils/utils"
import { register } from './api'
const loading = ref(false)
const userInfo = ref({ username: "", password: "" })
const backToLogin = () => {
    
    router.replace({ name: 'login' })
}


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
        let registerResponse = await register(userInfo.value.username, userInfo.value.password) as unknown as Record<string, any>

        if (registerResponse.data.result == "success") {
            localStorage.setItem("username", userInfo.value.username)
            localStorage.setItem("password", userInfo.value.password)
            loading.value = false
            Message.success({
                content: '注册成功'
            })
            await await sleep(1000)
            backToLogin()
        } else {
            Message.error({
                content: '注册失败:' + registerResponse.data.message
            })
        }
    } catch (e) {
        loading.value = false
        console.error(e)
        Message.error({
            content: '注册失败:无法连接到服务器'
        })
        return
    }
}
</script>
<style scoped>
.register-form {
    width: 80vw;
    margin-top: 10vh;
    margin-left: 10vw;
}
</style>