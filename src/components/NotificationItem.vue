<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

export interface Notification {
  id: string
  title: string
  preview_text: string
  full_text: string
  author: string
  created: string
  read: boolean
  available_actions: string[]
}

const { notification } = defineProps<{
  notification: Notification
}>()

const notificationError = ref<string | null>(null)
const notificationSuccess = ref<string | null>(null)


const handleNotificationClick = async () => {
  console.log(notification.available_actions)
  try {
    if (notification.available_actions.includes('CREATE_TODO')) {
      // Action is available, make the "CREATE TODO" API call
      const response = await axios.post('https://o59ee.wiremockapi.cloud/notifications/action', {
        id: notification.id,
        action: 'TODO'
      })

      notificationSuccess.value = 'TODO added'
      setTimeout(() => {
        notificationSuccess.value = null
    }, 2000)


    } else {
      // "CREATE TODO" action is not available, make the "ignore" API call
      const response = await axios.post('https://o59ee.wiremockapi.cloud/notifications/ignore', {
        id: notification.id
      })

      notificationSuccess.value = 'Notification ignored'
      setTimeout(() => {
        notificationSuccess.value = null
    }, 2000)

    }
  } catch (error) {
    // Handle any errors (e.g., display an error message)
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
  <div class="flex-row wrapper" @click="handleNotificationClick">
    <div v-if="!notification.read" class="dot"></div>
    <div class="flex-col info">
      <h1 class="title">{{ notification.title }}</h1>
      <p class="text">{{ notification.preview_text }}</p>
      <span class="flex-row data">
        <h2 class="author">{{ notification.author }}</h2>
        <h2 class="author">{{ notification.created }}</h2>
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

.dot {
  height: 0.1rem;
  width: 0.1rem;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
}

.wrapper {
  justify-content: center;
  width: 100%;
  max-width: 30rem;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid #ffffff33;
  cursor: pointer;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
.text {
  font-size: 0.5rem;
  font-weight: normal;
  color: white;
}
.author {
  color: #ffffff99;
}

.error {
  background-color: #DF6873;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;
}
.success {
  background-color: #80DED9;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
