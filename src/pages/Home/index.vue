<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Welcome to TMDB</h1>
    <h2 class="text-2xl font-bold mb-4">Trending</h2>

    <MovieTabs :active-tab="store.activeTab" />
    <MovieFilters @filter="store.updateFilters" />

    <div v-if="store.loading" class="flex justify-center py-12">
      <Progress :model-value="100" class="w-32" />
    </div>

    <div v-else-if="store.error" class="text-red-500 text-center py-12">
      {{ store.error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <MovieCard 
        v-for="movie in store.activeTab === 'trending' ? store.trending : store.popular"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/store/movie-store'
import MovieCard from '@/components/MovieCard.vue'
import MovieFilters from '@/components/MovieFilters.vue'
import MovieTabs from '@/components/MovieTabs.vue'
import { Progress } from '@/components/ui/progress'

const store = useMovieStore()

onMounted(async () => {
  await Promise.all([
    store.fetchTrending(),
    store.fetchGenres()
  ])
})
</script> 
