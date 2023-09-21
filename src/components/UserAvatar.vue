<template>
  <div class="avatar" :style="{ backgroundColor: randomColor }">
    <div v-if="showDot" class="dot"></div>
    <span class="avatar-initials">{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    required: true // Make userName prop mandatory
  },
  showDot: {
    type: Boolean,
  }
})

const { userName, showDot } = toRefs(props)

const initials = userName.value
  .split(' ')
  .map((word) => word[0])
  .join('')

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const randomColor = getRandomColor()
</script>

<style>
.dot {
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
}

.avatar {
  margin: auto;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar-initials {
  font-size: 1rem;
  color: #ffffff;
}
</style>
