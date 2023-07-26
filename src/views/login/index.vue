<!--
 * @Author: QyInvoLing
 * @Date: 2023-07-26 17:29:08
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-26 17:58:54
 * @FilePath: \tauri-mo-client\src\views\login\index.vue
 * @Description: 
-->
<template>
    <div class="login-form-wrapper">
        <div class="login-form-title">{{ ('login.form.title') }}</div>
        <div class="login-form-sub-title">{{ ('login.form.title') }}</div>
        <div class="login-form-error-msg">{{ 'errorMessage' }}</div>
        <!-- :model="userInfo"
        @submit="handleSubmit" -->
        <a-form ref="loginForm" class="login-form" layout="vertical">
            <a-form-item field="username" :rules="[{ required: true, message: ('login.form.userName.errMsg') }]"
                :validate-trigger="['change', 'blur']" hide-label>
                <!-- v-model="userInfo.username" -->
                <a-input :placeholder="('login.form.userName.placeholder')">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item field="password" :rules="[{ required: true, message: ('login.form.password.errMsg') }]"
                :validate-trigger="['change', 'blur']" hide-label>
                <!-- v-model="userInfo.password" -->
                <a-input-password :placeholder="'login.form.password.placeholder'" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <div class="login-form-password-actions">
                    <!-- :model-value="loginConfig.rememberPassword"
              @change="setRememberPassword as any" -->
                    <a-checkbox checked="rememberPassword">
                        记住密码
                    </a-checkbox>
                    <a-link></a-link>
                </div>
                <!-- :loading="loading"> -->
                <a-button type="primary" html-type="submit" @click="clickLoginButton" long>
                    登录
                </a-button>
                <a-button type="text" long class="login-form-register-btn">
                    注册
                </a-button>
            </a-space>
        </a-form>
    </div>
</template>
  
<script lang="ts" setup>
import { invoke } from '@tauri-apps/api'
const clickLoginButton = () => {
    invoke('greet', { name: 'World' })
        // `invoke` 返回的是一个 Promise
        .then((response) => console.log(response))
}
</script>
  
<style scoped></style>
  