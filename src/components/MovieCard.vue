<script setup lang="ts">
interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="relative group">
    <img 
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
      :alt="movie.title"
      class="rounded-lg"
    >
    <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
      <h3 class="font-semibold">{{ movie.title }}</h3>
      <p class="text-sm text-gray-300">{{ new Date(movie.release_date).getFullYear() }}</p>
    </div>
  </div>
</template> 
