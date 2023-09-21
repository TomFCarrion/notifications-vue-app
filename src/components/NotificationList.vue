<template>
  <div class="notifications">
    <template v-for="notification in notifications" :key="notification.id">
      <div v-if="error">
        {{ error }}
      </div>
      <div v-if="isLoading">
        {{ error }}
      </div>
      <NotificationItem v-if="!isLoading" :notification="notification" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from './NotificationItem.vue';
import { useAxios } from '../hooks/useAxios'
import NotificationItem from './NotificationItem.vue'
const apiUrl = import.meta.env.VITE_NOTIFICATIONS_URL

const { data: notifications, error, isLoading } = useAxios<Notification[]>(apiUrl)
</script>

<style>
.notifications {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
