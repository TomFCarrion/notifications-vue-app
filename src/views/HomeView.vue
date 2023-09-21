<script setup lang="ts">
import NotificationList from '../components/NotificationList.vue';
</script>

<template>
  <main>

    <header>
      <h1>Notifications</h1>
    </header>

    <NotificationList
      />

  </main>
</template>

<style scoped>
 header{
    width: 100%;
    display: flex;
    height: 4rem;
    font-size: .6rem;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    border: 1px solid #ffffff33;
 }

</style>
