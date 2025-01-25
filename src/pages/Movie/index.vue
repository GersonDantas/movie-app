<template>
  <div class="movie-details">
    <div v-if="store.loading" data-test="loading">Loading...</div>
    
    <div v-else-if="store.error" data-test="error">
      {{ store.error }}
    </div>
    
    <template v-else-if="store.currentMovie">
      <h1 data-test="movie-title">{{ store.currentMovie.title }}</h1>
      <p data-test="movie-overview">{{ store.currentMovie.overview }}</p>
      <div data-test="movie-score">{{ Math.round(store.currentMovie.vote_average * 10) }}%</div>
      <div data-test="release-date">
        {{ formatDate(store.currentMovie.release_date) }}
      </div>
    </template>

    <!-- Movie Backdrop -->
    <div 
      v-if="store.currentMovie?.backdrop_path"
      class="relative h-[400px] bg-cover bg-center"
      :style="`background-image: url(https://image.tmdb.org/t/p/original${store.currentMovie.backdrop_path})`"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50">
        <div class="container mx-auto px-4 h-full flex items-center">
          <div class="flex gap-8">
            <!-- Movie Poster -->
            <img 
              :src="`https://image.tmdb.org/t/p/w500${store.currentMovie.poster_path}`"
              :alt="store.currentMovie.title"
              class="w-64 h-auto rounded-lg"
            />
            
            <!-- Movie Info -->
            <div class="text-white">
              <h1 class="text-4xl font-bold mb-2">{{ store.currentMovie.title }}</h1>
              <p class="text-gray-300 mb-4">{{ formatDate(store.currentMovie.release_date) }}</p>
              <div class="flex items-center gap-4 mb-6">
                <div class="bg-tmdb-primary rounded-full p-3">
                  <span class="text-xl font-bold">{{ Math.round(store.currentMovie.vote_average * 10) }}%</span>
                </div>
                <span class="text-lg">User Score</span>
              </div>
              <p class="text-xl mb-4">Overview</p>
              <p class="text-gray-300 max-w-2xl">{{ store.currentMovie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cast Section -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold mb-6">Top Billed Cast</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <!-- Cast cards will go here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/store/movie-store'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useMovieStore()

const formatDate = (date: string) => {
  if (!date) return ''
  const dateObj = new Date(date + 'T00:00:00.000Z')
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

const fetchMovie = () => {
  const id = route.params.id as string
  if (id) {
    store.fetchMovieDetails(id)
  }
}

onMounted(fetchMovie)
watch(() => route.params.id, fetchMovie, { immediate: true })
</script> 
