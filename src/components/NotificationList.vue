<template>
    <div class="notifications">
      <template v-for="notification in notifications" :key="notification.id">
       <NotificationItem :notification="notification"/>
      </template>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted } from 'vue';
import NotificationItem from './NotificationItem.vue';

import axios from 'axios';

export interface Notification {
  id: string;
  title: string;
  preview_text: string;
  full_text: string;
  author: string;
  created: string;
  read: boolean;
  available_actions: string[];
}

const notifications = ref<Notification[]>([]);


const loadNotifications = async () => {
  try {
    const response = await axios.get<Notification[]>('https://o59ee.wiremockapi.cloud/notifications');
    notifications.value = response.data;
  } catch (error) {
    console.error('Error loading notifications:', error);
  }
}


onMounted(() => {
  loadNotifications();
});
</script>


<style>
.notifications{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
</style>
