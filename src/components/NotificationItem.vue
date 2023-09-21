<script setup lang="ts">
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
</script>

<template>
  <div class="flex-row wrapper">
    <div v-if="!notification.read" class="dot"></div>
    <div class="flex-col info">
      <h1 class="title">{{ notification.title }}</h1>
      <p class="text">{{ notification.preview_text }}</p>
      <span class="flex-row data">
        <h2 class="author">{{ notification.author }}</h2>
        <h2 class="author">{{ notification.created }}</h2>
      </span>
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
</style>
