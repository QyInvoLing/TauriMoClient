<template>
  <router-view />
</template>
<script setup lang="ts">
 window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.code == "KeyF") || e.code =="F5") { 
          e.preventDefault();
    }
})
document.addEventListener('contextmenu', event => event.preventDefault())
</script>
<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
