<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import UserAvatar from './UserAvatar.vue'
import type { Notification } from '../types/NotificationsType';

const { notification } = defineProps<{
  notification: Notification
}>()

const notificationError = ref<string | null>(null)
const notificationSuccess = ref<string | null>(null)

const handleNotificationClick = async () => {
  try {
    if (notification.available_actions.includes('CREATE_TODO')) {
      // "CREATE TODO" available, make the "CREATE TODO" API call
      const response = await axios.post('https://o59ee.wiremockapi.cloud/notifications/action', {
        id: notification.id,
        action: 'TODO'
      })

      if (response.status === 200 || response.status === 204) {
        notificationSuccess.value = 'TODO added'
        setTimeout(() => {
          notificationSuccess.value = null
        }, 2000)
      }
    } else {
      // "CREATE TODO" action is not available, make the "ignore" API call
      const response = await axios.post('https://o59ee.wiremockapi.cloud/notifications/ignore', {
        id: notification.id
      })

      if (response.status === 200 || response.status === 204) {
        notificationSuccess.value = 'Notification ignored'
        setTimeout(() => {
          notificationSuccess.value = null
        }, 2000)
      }

      setTimeout(() => {
        notificationSuccess.value = null
      }, 2000)
    }
  } catch (error) {
    // Handle any error
    console.error('Error:', error)
    notificationError.value = "Can't add TODO action to this notification"
    // Clear the error message after 1 second
    setTimeout(() => {
      notificationError.value = null
    }, 2000)
  }
}
</script>

<template>
  <div class="flex-row notification" @click="handleNotificationClick" :data-test-id="notification.id">
    <UserAvatar :userName="notification.author" :showDot="!notification.read" />
    <div class="flex-col info">
      <h1 class="title">{{ notification.title }}</h1>
      <p class="text">{{ notification.preview_text }}</p>
      <span class="flex-row data">
        <h2 class="author">{{ notification.author.toUpperCase() }}</h2>
        <h2 class="author">{{ notification.created.toUpperCase() }}</h2>
      </span>
      <transition name="fade" mode="out-in">
        <div v-if="notificationError" class="error">
          {{ notificationError }}
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="notificationSuccess" class="success">
          {{ notificationSuccess }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.data {
  justify-content: space-between;
}

.info {
  gap: 0.5rem;
}

.notification {
  justify-content: center;
  width: 100%;
  padding: 1rem;
  gap: .5rem;
  border: .2px solid #ffffff33;
  cursor: pointer;
  position: relative;
}

.title {
  font-size: .7rem;
  font-weight: bold;
  color: white;
}

.text {
  font-size: .8rem;
  font-weight: 400;

  color: white;
}

.author {
  color: #ffffff99;
  font-size: .7rem;
  font-weight: 600;

}
.error {
  position: absolute;
  top: 10;
  left: 20%;
  background-color: rgba(223, 104, 115, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;
}

.success {
  position: absolute;
  top: 10;
  left: 30%;
  background-color: rgba(128, 222, 217, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;
}


</style>
