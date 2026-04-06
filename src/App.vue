<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'

const route = useRoute()
</script>

<template>
  <Header v-if="route.meta.requiresAuth" />
  <router-view />
</template>

<style>

</style>