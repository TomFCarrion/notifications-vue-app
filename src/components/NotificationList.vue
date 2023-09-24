<template>
  <div class="notifications">
    <template v-for="notification in notifications" :key="notification?.id">
      <NotificationItem :notification="notification" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from '../types/NotificationsType'
import NotificationItem from './NotificationItem.vue'

const { notifications } = defineProps<{
  notifications: Notification[]
}>()
</script>

<style>
.notifications {
  overflow: auto;
  position: absolute;
  top: 4rem;
  bottom: 4rem;
}
</style>
