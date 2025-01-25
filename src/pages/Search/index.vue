<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search Results Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Search Results</h1>
      <p class="text-gray-400" v-if="route.query.q">
        Showing results for "{{ route.query.q }}"
      </p>
    </div>

    <!-- Results Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="movie in searchResults" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`" class="block bg-gray-800 rounded-lg overflow-hidden">
          <img 
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
            :alt="movie.title"
            class="w-full h-auto"
          />
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-1">{{ movie.title }}</h3>
            <p class="text-gray-400">{{ formatDate(movie.release_date) }}</p>
            <p class="text-gray-400 mt-2 line-clamp-2">{{ movie.overview }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-if="searchResults.length === 0 && !store.loading" class="text-center py-12">
      <p class="text-xl text-gray-400">No results found</p>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="text-center py-12">
      <p class="text-xl text-gray-400">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movie-store'
import dayjs from 'dayjs'
import { computed } from 'vue'

const route = useRoute()
const store = useMovieStore()

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const searchResults = computed(() => store.searchResults)

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    store.searchMovies(newQuery as string)
  }
}, { immediate: true })
</script> 
