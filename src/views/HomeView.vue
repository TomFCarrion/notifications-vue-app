<script setup lang="ts">
import NotificationList from '../components/NotificationList.vue';
</script>

<template>
  <header>
    <h1>Notifications</h1>
  </header>

  <NotificationList />

  <footer>
    <span>Home</span>
    <span>Notifications</span>
    <span>Logout</span>
  </footer>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  height: 4rem;
  font-size: 0.6rem;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

footer {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  background-color: #2f384c;
  z-index: 100;
}
</style>
