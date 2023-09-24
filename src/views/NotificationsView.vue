<script setup lang="ts">
import NotificationList from '../components/NotificationList.vue';
import { mockResponse } from '../utils/mockData'
import { ref } from 'vue';

// import type { Notification } from '../types/NotificationsType';
// import { useAxios } from '../hooks/useAxios'

// const apiUrl = import.meta.env.VITE_NOTIFICATIONS_URL
// const { data: notifications, error, isLoading } = useAxios<Notification[]>(apiUrl)

const isLoading = ref(false)
const error = ref(null)
const notifications = mockResponse

</script>

<template>
  <header>
    <h1>Notifications</h1>
  </header>

  <div v-if="error">
    {{ error }}
  </div>
  <div v-if="isLoading">
    {{ error }}
  </div>
  <NotificationList class="test2" :notifications="notifications" />

  <footer>
    <a href="/company" class="footer-item ">Company</a>
    <span class="footer-item active ">Notifications</span>
    <span class="footer-item ">Logout</span>
  </footer>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  height: 4rem;
  font-size: 0.6rem;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-bottom: 1px solid #ffffff33;

}

footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  background-color: #2f384c;
  z-index: 100;
}

.footer-item {
  color: white;
  text-decoration: none;
}

.active {
  font-weight: bold;
}
</style>
