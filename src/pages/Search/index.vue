<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Search Results</h1>
      <p class="text-gray-400" v-if="route.query.q">
        Showing results for "{{ route.query.q }}"
      </p>
    </div>

    <div v-if="store.loading" data-test="loading">Loading...</div>
    <div v-else-if="store.error" data-test="error">{{ store.error }}</div>
    <div v-else-if="store.searchResults.length === 0" data-test="no-results">
      No results found
    </div>
    <div v-else>
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

      <div v-if="store.searchResults.length > 0" class="mt-8">
        <Pagination
          :page-index="store.pagination.currentPage"
          :total-count="store.pagination.totalResults"
          :per-page="store.pagination.perPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/movie-store'
import dayjs from 'dayjs'
import { computed } from 'vue'
import Pagination from '@/components/Pagination.vue'

const route = useRoute()
const router = useRouter()
const store = useMovieStore()

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const searchResults = computed(() => store.searchResults)

const handlePageChange = async (page: number) => {
  await router.push({ 
    query: { 
      ...route.query,
      page: (page + 1).toString()
    }
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.query,
  async (query) => {
    if (query.q) {
      const page = Number(query.page) || 1
      await store.searchMovies(query.q as string, page)
    }
  },
  { immediate: true }
)
</script> 
