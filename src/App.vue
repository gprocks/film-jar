<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <nav-bar />
    <div class="container-md">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
