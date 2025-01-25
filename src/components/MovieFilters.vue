<script setup lang="ts">
import { ref } from 'vue'

interface FilterOptions {
  sortBy: 'popularity' | 'rating' | 'date'
  genre: string
  year: string
}

const emit = defineEmits<{
  (e: 'filter', filters: FilterOptions): void
}>()

const filters = ref<FilterOptions>({
  sortBy: 'popularity',
  genre: '',
  year: ''
})

const years = ref(Array.from({ length: 24 }, (_, i) => new Date().getFullYear() - i))

const updateFilters = () => {
  emit('filter', filters.value)
}
</script>

<template>
  <div class="flex gap-4 mb-6">
    <select 
      v-model="filters.sortBy"
      class="bg-gray-800 rounded-lg px-4 py-2"
      @change="updateFilters"
      data-testid="sort-select"
    >
      <option value="popularity">Popularity</option>
      <option value="rating">Rating</option>
      <option value="date">Release Date</option>
    </select>

    <select 
      v-model="filters.genre"
      class="bg-gray-800 rounded-lg px-4 py-2"
      @change="updateFilters"
      data-testid="genre-select"
    >
      <option value="">All Genres</option>
      <option value="28">Action</option>
      <option value="12">Adventure</option>
      <option value="16">Animation</option>
      <!-- Add more genres -->
    </select>

    <select 
      v-model="filters.year"
      class="bg-gray-800 rounded-lg px-4 py-2"
      @change="updateFilters"
      data-testid="year-select"
    >
      <option value="">All Years</option>
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
  </div>
</template> 
