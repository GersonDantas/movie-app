<script setup lang="ts">
import { useMovieStore } from '@/store/movie-store'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

const store = useMovieStore()
const activeTab = computed(() => store.activeTab)

const customClass = ['text-white px-4 py-2 rounded-full hover:bg-opacity-90 bg-gray-700']

const setActiveTab = async (tab: string) => {
  store.activeTab = tab
  if (tab === 'trending') await store.fetchTrending(1)
  if (tab === 'popular') await store.fetchPopular(1)
  store.pagination.currentPage = 0
}
</script>

<template>
  <div class="flex gap-2 mb-6">
    <Button 
      variant="secondary"
      data-testid="trending-tab"
      :class="[...customClass, { 'bg-tmdb-secondary': activeTab === 'trending' }]"
      @click="setActiveTab('trending')"
    >
      Trending
    </Button>
    <Button 
      variant="secondary"
      data-testid="popular-tab"
      :class="[...customClass, { 'bg-tmdb-secondary': activeTab === 'popular' }]"
      @click="setActiveTab('popular')"
    >
      Popular
    </Button>
  </div>
</template> 
