<template>
  <router-view />
</template>
<script setup lang="ts">
const isDevelopment = import.meta.env.DEV;
 window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.code == "KeyF") || e.code =="F5") { 
          e.preventDefault();
    }
})
if(!isDevelopment){//非开发模式下不许开右键菜单
  document.addEventListener('contextmenu', event => event.preventDefault())
}

</script>
<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
