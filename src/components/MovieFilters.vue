<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMovieStore } from '@/store/movie-store'

interface FilterOptions {
  sortBy: 'popularity' | 'rating' | 'date'
  genre: string
  year: string
}

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
  <div class="flex gap-4 mb-6">
    <Select v-model="filters.sortBy" @update:modelValue="updateFilters">
      <SelectTrigger data-testid="sort-select" class="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem 
          v-for="option in sortOptions" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="filters.genre" @update:modelValue="updateFilters">
      <SelectTrigger data-testid="genre-select" class="w-[180px]">
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>
      <SelectContent data-testid="genre-select-content">
        <SelectItem value="all">All Genres</SelectItem>
        <SelectItem 
          v-for="genre in store.genres" 
          :key="genre.id" 
          :value="genre.id.toString()"
        >
          {{ genre.name }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="filters.year" @update:modelValue="updateFilters">
      <SelectTrigger data-testid="year-select" class="w-[180px]">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Years</SelectItem>
        <SelectItem 
          v-for="year in years" 
          :key="year" 
          :value="year.toString()"
        >
          {{ year }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template> 
