<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMovieStore } from '@/store/movie-store'
import type { FilterOptions } from '@/types/movie'

const store = useMovieStore()
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

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'date', label: 'Release Date' }
]
</script>

<template>
  <div class="flex gap-4 mb-6 md:flex-row flex-col">
    <Select v-model="filters.sortBy" @update:modelValue="updateFilters">
      <SelectTrigger data-testid="sort-select" class="bg-gray-700 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-tmdb-secondary hover:bg-opacity-90">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent class="bg-gray-700 rounded-lg mt-2 text-white">
        <SelectItem 
          v-for="option in sortOptions" 
          :key="option.value" 
          :value="option.value"
          class="px-6 py-2 hover:bg-gray-600 cursor-pointer"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="filters.genre" @update:modelValue="updateFilters">
      <SelectTrigger data-testid="genre-select" class="bg-gray-700 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-tmdb-secondary hover:bg-opacity-90">
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>
      <SelectContent data-testid="genre-select-content" class="bg-gray-700 rounded-lg mt-2 text-white">
        <SelectItem value="all" class="px-6 py-2 hover:bg-gray-600 cursor-pointer">All Genres</SelectItem>
        <SelectItem 
          v-for="genre in store.genres" 
          :key="genre.id" 
          :value="genre.id.toString()"
          class="px-6 py-2 hover:bg-gray-600 cursor-pointer"
        >
          {{ genre.name }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="filters.year" @update:modelValue="updateFilters">
      <SelectTrigger data-testid="year-select" class="bg-gray-700 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-tmdb-secondary hover:bg-opacity-90">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent class="bg-gray-700 rounded-lg mt-2 text-white">
        <SelectItem value="all" class="px-6 py-2 hover:bg-gray-600 cursor-pointer">All Years</SelectItem>
        <SelectItem 
          v-for="year in years" 
          :key="year" 
          :value="year.toString()"
          class="px-6 py-2 hover:bg-gray-600 cursor-pointer"
        >
          {{ year }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template> 
