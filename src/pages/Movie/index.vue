<template>
  <div v-if="store.loading" class="flex justify-center py-12">
    <Progress :model-value="100" class="w-32" data-testid="loading" />
  </div>

  <div v-else-if="store.error" class="text-red-500 text-center py-12" data-testid="error">
    {{ store.error }}
  </div>

  <div v-else-if="store.currentMovie" class="min-h-screen">
    <div 
      class="relative min-h-[300px] md:h-[500px] bg-cover bg-center"
      :style="`background-image: url(${backdropUrl})`"
    >
      <div class="absolute inset-auto bg-gradient-to-t from-gray-900 via-gray-900/50">
        <div class="container mx-auto px-4 h-full flex items-end pb-6 md:pb-12">
          <div class="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
            <img 
              :src="posterUrl"
              :alt="store.currentMovie.title"
              class="w-48 md:w-80 rounded-lg shadow-xl self-center md:self-auto"
              data-testid="movie-poster"
            />
            
            <div class="flex-1 text-center md:text-left">
              <h1 
                class="text-2xl md:text-4xl font-bold mb-2"
                data-testid="movie-title"
              >
                {{ store.currentMovie.title }}
              </h1>
              
              <div class="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-6 text-gray-300 flex-wrap">
                <span data-testid="release-date">
                  {{ formatDate(store.currentMovie.release_date) }}
                </span>
                <span v-if="store.currentMovie.runtime" data-testid="runtime">
                  {{ formatRuntime(store.currentMovie.runtime) }}
                </span>
              </div>

              <div class="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-6">
                <CircularProgress 
                  :value="store.currentMovie.vote_average * 10"
                  :size="64"
                  :stroke-width="6"
                  data-testid="movie-score"
                />
                <span class="text-xl md:text-2xl font-bold">
                  User Score
                </span>
              </div>

              <p 
                class="text-base md:text-lg text-gray-300 mb-6"
                data-testid="movie-overview"
              >
                {{ store.currentMovie.overview }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 md:py-12 sm:mt-[260px]">
      <h2 class="text-xl md:text-2xl font-bold mb-6">Top Billed Cast</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        <div 
          v-for="actor in store.currentMovieCredits?.cast?.slice(0, 12)" 
          :key="actor.id"
          class="bg-gray-800 rounded-lg overflow-hidden"
          data-testid="cast-card"
        >
          <img 
            :src="getActorImageUrl(actor.profile_path)"
            :alt="actor.name"
            class="w-full aspect-[2/3] object-cover bg-gray-700"
            loading="lazy"
          />
          <div class="p-3 md:p-4">
            <h3 class="font-bold text-sm md:text-base">{{ actor.name }}</h3>
            <p class="text-xs md:text-sm text-gray-400">{{ actor.character }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movie-store'
import { Progress } from '@/components/ui/progress'
import dayjs from 'dayjs'
import CircularProgress from '@/components/CircularProgress.vue'

const route = useRoute()
const store = useMovieStore()

onMounted(async () => {
  const movieId = route.params.id as string
  await store.fetchMovieDetails(movieId)
})

const backdropUrl = computed(() => {
  if (store.currentMovie?.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${store.currentMovie.backdrop_path}`
  }
  return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
})

const posterUrl = computed(() => {
  if (store.currentMovie?.poster_path) {
    return `https://image.tmdb.org/t/p/w500${store.currentMovie.poster_path}`
  }
  return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
})

const getActorImageUrl = (profilePath: string | null) => {
  if (profilePath) {
    return `https://image.tmdb.org/t/p/w185${profilePath}`
  }
  return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
}

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}
</script> 
