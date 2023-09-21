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
import { mockResponse } from '../utils/mockData'
import type { Notification } from './NotificationItem.vue';
import { useAxios } from '../hooks/useAxios'
import NotificationItem from './NotificationItem.vue'
import { ref } from 'vue';
const apiUrl = import.meta.env.VITE_NOTIFICATIONS_URL

// const { data: notifications, error, isLoading } = useAxios<Notification[]>(apiUrl)

const isLoading = ref(false)
const error = ref(null)
const notifications = mockResponse

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
