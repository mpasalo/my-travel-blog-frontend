<script setup>
import { RouterView, RouterLink } from 'vue-router';

</script>

<template>
  <nav class="text-center text-white">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/login">Login</RouterLink> |
    <RouterLink to="/register">Register</RouterLink>
  </nav>
  <main>
    <RouterView />
    
  </main>

</template>
