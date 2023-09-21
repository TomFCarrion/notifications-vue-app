<template>
  <div class="avatar" :style="{ backgroundColor: randomColor }">
    <div class="avatar-circle">
      <span class="avatar-initials">{{ initials }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    required: true // Make userName prop mandatory
  }
})

const { userName } = toRefs(props)

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
.avatar-circle {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-initials {
  font-size: 1rem;
  color: #ffffff; /* Text color */
}


</style>
