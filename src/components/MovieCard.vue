<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import type { Movie } from '@/types/movie'
import CircularProgress from '@/components/CircularProgress.vue'

const props = defineProps<{
  movie: Movie
}>()

const score = computed(() => Math.round(props.movie.vote_average * 10))

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const posterUrl = computed(() => {
  if (props.movie.poster_path) {
    return `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
  }
  return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
})
</script>

<template>
  <router-link 
    :to="`/movie/${movie.id}`" 
    class="block group transition-transform hover:scale-105"
    data-testid="movie-card"
  >
    <div class="relative rounded-lg overflow-hidden mb-2">
      <img 
        :src="posterUrl" 
        :alt="movie.title"
        class="w-full aspect-[2/3] object-cover bg-gray-800"
        data-testid="movie-poster"
      />
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80">
        <div class="flex items-center gap-2">
          <CircularProgress 
            :value="score"
            :size="40"
            data-testid="movie-score"
          />
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
