<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="bg-tmdb-primary rounded-lg p-8 mb-12">
      <h1 class="text-4xl font-bold mb-4">Welcome to TMDB</h1>
      <p class="text-xl text-gray-300">Millions of movies to discover. Explore now.</p>
    </div>

    <!-- Trending Section -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Trending</h2>
        <div class="flex gap-2">
          <button 
            class="px-4 py-2 rounded-full"
            :class="[timeWindow === 'day' ? 'bg-tmdb-secondary' : 'bg-gray-700']"
            @click="timeWindow = 'day'"
          >
            Today
          </button>
          <button 
            class="px-4 py-2 rounded-full"
            :class="[timeWindow === 'week' ? 'bg-tmdb-secondary' : 'bg-gray-700']"
            @click="timeWindow = 'week'"
          >
            This Week
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div v-for="movie in trending" :key="movie.id" class="movie-card">
          <router-link :to="`/movie/${movie.id}`">
            <img 
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
              :alt="movie.title"
              class="rounded-lg w-full h-auto"
            />
            <h3 class="mt-2 font-semibold">{{ movie.title }}</h3>
            <p class="text-gray-400">{{ formatDate(movie.release_date) }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Latest Trailers Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Latest Trailers</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Trailer cards will go here -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/movie-store'
import dayjs from 'dayjs'

const store = useMovieStore()
const timeWindow = ref('week')

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

onMounted(() => {
  store.fetchTrending()
})

const trending = computed(() => store.trending)
</script> 
