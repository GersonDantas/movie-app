<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/store/movie-store'

const store = useMovieStore()

onMounted(() => {
  store.fetchTrending()
})
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global styles */
body {
  @apply antialiased text-gray-100;
}

::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-tmdb-secondary rounded-full;
}
</style>
