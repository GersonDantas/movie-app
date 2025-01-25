<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { Progress } from '@/components/ui/progress'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

const props = defineProps<{
  movie: Movie
}>()

const score = computed(() => Math.round(props.movie.vote_average * 10))

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}
</script>

<template>
  <router-link 
    :to="`/movie/${movie.id}`" 
    class="block group transition-transform hover:scale-105"
    data-testid="movie-card"
  >
    <div class="relative rounded-lg overflow-hidden mb-2">
      <img 
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
        :alt="movie.title"
        class="w-full aspect-[2/3] object-cover"
        data-testid="movie-poster"
      />
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-tmdb-primary flex items-center justify-center">
            <Progress 
              :model-value="score" 
              class="w-8 h-8"
              data-testid="movie-score"
            />
          </div>
        </div>
      </div>
    </div>
    <h3 
      class="font-semibold text-sm group-hover:text-tmdb-secondary transition-colors"
      data-testid="movie-title"
    >
      {{ movie.title }}
    </h3>
    <p 
      class="text-gray-400 text-sm"
      data-testid="movie-date"
    >
      {{ formatDate(movie.release_date) }}
    </p>
  </router-link>
</template> 
