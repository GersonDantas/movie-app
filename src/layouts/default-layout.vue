<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import ToggleTheme from '@/components/theme/ToggleTheme.vue'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    })
  }
}
</script> 

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="bg-tmdb-primary">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <router-link to="/" class="text-1xl md:text-2xl font-bold text-tmdb-secondary">TMDB</router-link>
        
        <div class="flex items-center space-x-3 gap-2">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              placeholder="Search for movies..."
              class="bg-background text-foreground px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-tmdb-secondary"
            />
          </div>
          
          <Button 
            @click="handleSearch"
            variant="secondary"
            class="bg-tmdb-secondary text-foreground px-4 py-2 rounded-full hover:bg-opacity-90"
          >
            Search
          </Button>
          <ToggleTheme />
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="bg-tmdb-primary mt-12 py-8">
      <div class="container mx-auto px-4">
        <p class="text-center text-gray-400">
          © {{ new Date().getFullYear() }} TMDB Clone. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
