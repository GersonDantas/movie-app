<template>
  <div v-if="store.loading" class="flex justify-center py-12">
    <Progress :model-value="100" class="w-32" data-testid="loading" />
  </div>

  <div v-else-if="store.error" class="text-red-500 text-center py-12" data-testid="error">
    {{ store.error }}
  </div>

  <div v-else-if="store.currentMovie" class="min-h-screen">
    <!-- Banner -->
    <div 
      class="relative h-[500px] bg-cover bg-center"
      :style="`background-image: url(https://image.tmdb.org/t/p/original${store.currentMovie.backdrop_path})`"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50">
        <div class="container mx-auto px-4 h-full flex items-end pb-12">
          <div class="flex gap-8">
            <!-- Poster -->
            <img 
              :src="`https://image.tmdb.org/t/p/w500${store.currentMovie.poster_path}`"
              :alt="store.currentMovie.title"
              class="w-80 rounded-lg shadow-xl"
              data-testid="movie-poster"
            />
            
            <!-- Info -->
            <div class="flex-1">
              <h1 
                class="text-4xl font-bold mb-2"
                data-testid="movie-title"
              >
                {{ store.currentMovie.title }}
              </h1>
              
              <div class="flex items-center gap-4 mb-6 text-gray-300">
                <span data-testid="release-date">
                  {{ formatDate(store.currentMovie.release_date) }}
                </span>
                <span v-if="store.currentMovie.runtime" data-testid="runtime">
                  {{ formatRuntime(store.currentMovie.runtime) }}
                </span>
              </div>

              <!-- Score -->
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-full bg-tmdb-primary flex items-center justify-center">
                  <Progress 
                    :model-value="store.currentMovie.vote_average * 10" 
                    class="w-12 h-12"
                    data-testid="movie-score"
                  />
                </div>
                <span class="text-2xl font-bold">
                  {{ Math.round(store.currentMovie.vote_average * 10) }}%
                </span>
              </div>

              <p 
                class="text-lg text-gray-300 mb-6"
                data-testid="movie-overview"
              >
                {{ store.currentMovie.overview }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cast Section -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold mb-6">Cast</h2>
      <div class="grid grid-cols-6 gap-6">
        <div 
          v-for="actor in store.currentMovieCast?.slice(0, 12)" 
          :key="actor.id"
          class="bg-gray-800 rounded-lg overflow-hidden"
          data-testid="cast-card"
        >
          <img 
            :src="actor.profile_path 
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : '/placeholder-actor.png'"
            :alt="actor.name"
            class="w-full aspect-[2/3] object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold">{{ actor.name }}</h3>
            <p class="text-sm text-gray-400">{{ actor.character }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movie-store'
import { Progress } from '@/components/ui/progress'
import dayjs from 'dayjs'

const route = useRoute()
const store = useMovieStore()

onMounted(async () => {
  const movieId = route.params.id as string
  await store.fetchMovieDetails(movieId)
})

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}
</script> 
