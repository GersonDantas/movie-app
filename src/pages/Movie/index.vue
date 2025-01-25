<template>
  <div>
    <!-- Movie Backdrop -->
    <div 
      v-if="movie?.backdrop_path"
      class="relative h-[400px] bg-cover bg-center"
      :style="`background-image: url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50">
        <div class="container mx-auto px-4 h-full flex items-center">
          <div class="flex gap-8">
            <!-- Movie Poster -->
            <img 
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-64 h-auto rounded-lg"
            />
            
            <!-- Movie Info -->
            <div class="text-white">
              <h1 class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
              <p class="text-gray-300 mb-4">{{ formatDate(movie.release_date) }}</p>
              <div class="flex items-center gap-4 mb-6">
                <div class="bg-tmdb-primary rounded-full p-3">
                  <span class="text-xl font-bold">{{ Math.round(movie.vote_average * 10) }}%</span>
                </div>
                <span class="text-lg">User Score</span>
              </div>
              <p class="text-xl mb-4">Overview</p>
              <p class="text-gray-300 max-w-2xl">{{ movie.overview }}</p>
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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movie-store'
import dayjs from 'dayjs'

const route = useRoute()
const store = useMovieStore()

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const movie = computed(() => store.currentMovie)

onMounted(async () => {
  if (route.params.id) {
    await store.fetchMovieDetails(route.params.id as string)
  }
})
</script> 
